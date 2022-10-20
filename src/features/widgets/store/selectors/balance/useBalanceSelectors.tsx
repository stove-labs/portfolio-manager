import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useStoreContext } from '../../../../../store/useStore';
import { Token } from '../../../../../config/config/tokens';
import { getToken } from '../../../../../config/lib/helpers';
import { Balance } from '../../../components/TokenBalanceWidget/TokenBalanceWidget';
import { HistoricalPeriod } from '../../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';
import {
  useSelectTokenSpotPrice,
  useSelectTokenSpotPriceHistorical,
} from '../spotPrice/useSpotPriceSelectors';

/**
 * Get token based on id
 * @param {string} id - id of token
 * @returns Token
 */
export const useSelectToken = (id: string): Token | undefined => {
  return useMemo(() => {
    return getToken(id);
  }, [id]);
};

/**
 * Get loading status for token balance
 * @param {string} id - id of token
 * @returns loading state
 */
export const useSelectIsBalanceLoading = (id: string): boolean => {
  const [state] = useStoreContext();

  return useMemo((): boolean => {
    const tokenBalancesStatus = state.balances.tokenBalances?.[id]?.status;

    return (
      tokenBalancesStatus === undefined ||
      tokenBalancesStatus === 'LOADING' ||
      tokenBalancesStatus === 'STANDBY'
    );
  }, [id, state.balances.tokenBalances?.[id]?.status]);
};

/**
 * Get loading status for token balance historical
 * @param {string} id - id of token
 * @param {string} historicalPeriod - historicalPeriod
 * @returns loading state
 */
export const useSelectIsBalanceHistoricalLoading = (
  id: string,
  historicalPeriod: string
): boolean => {
  const [state] = useStoreContext();

  return useMemo((): boolean => {
    const tokenBalancesHistoricalStatus =
      state.balances.tokenBalancesHistorical?.[id + historicalPeriod]?.status;

    return (
      tokenBalancesHistoricalStatus === undefined ||
      tokenBalancesHistoricalStatus === 'LOADING' ||
      tokenBalancesHistoricalStatus === 'STANDBY'
    );
  }, [
    id,
    historicalPeriod,
    state.balances.tokenBalancesHistorical?.[id + historicalPeriod]?.status,
  ]);
};

/**
 * Get balance for token
 * @param {Token} token - token
 * @returns Balance
 */
export const useSelectBalance = (token?: Token): Balance => {
  const [state] = useStoreContext();
  const isLoading = useSelectIsBalanceLoading(token?.id ?? '');
  const price: string | undefined = useSelectTokenSpotPrice(
    state.prices.currency.ticker,
    token?.id ?? ''
  );

  return useMemo(() => {
    if (isLoading || !token) {
      return {
        amount: undefined,
        fiatBalance: { amount: undefined },
      };
    }
    const tokenBalance: BigNumber = BigNumber(
      state.balances.tokenBalances?.[token.id]?.balance ?? '0'
    ).dividedBy(10 ** Number(token?.metadata?.decimals ?? '6'));
    const amount: string | undefined = tokenBalance.toFixed(
      Number(token?.metadata?.decimals) ?? 6
    );
    const fiatBalance: { amount: string | undefined } = {
      amount:
        price &&
        tokenBalance
          .multipliedBy(price)
          .toFixed(Number(token?.metadata?.decimals) ?? 6),
    };

    return {
      amount,
      fiatBalance,
    };
  }, [isLoading, price, token, state.balances.tokenBalances]);
};

/**
 * Get historical balance for token
 * @param {HistoricalPeriod} historicalPeriod - historicalPeriod
 * @param {Token} token - token
 * @returns historical Balance
 */
export const useSelectBalanceHistorical = (
  historicalPeriod: HistoricalPeriod,
  token?: Token
): Balance => {
  const [state] = useStoreContext();
  const isLoading = useSelectIsBalanceHistoricalLoading(
    token?.id ?? '',
    historicalPeriod
  );
  const price: string | undefined = useSelectTokenSpotPriceHistorical(
    historicalPeriod,
    state.prices.currency.ticker,
    token?.id ?? ''
  );

  return useMemo(() => {
    if (isLoading || !token) {
      return {
        level: historicalPeriod,
        amount: undefined,
        fiatBalance: { amount: undefined },
      };
    }

    const tokenBalancesHistorical: BigNumber = BigNumber(
      state.balances.tokenBalancesHistorical?.[token.id + historicalPeriod]
        ?.balanceHistorical ?? '0'
    ).dividedBy(10 ** Number(token?.metadata?.decimals ?? '6'));
    const amount: string | undefined = tokenBalancesHistorical.toFixed(
      Number(token?.metadata?.decimals) ?? 6
    );
    const fiatBalance: { amount: string | undefined } = {
      amount:
        price &&
        tokenBalancesHistorical
          .multipliedBy(price)
          .toFixed(Number(token?.metadata?.decimals) ?? 6),
    };

    return {
      level: historicalPeriod,
      amount,
      fiatBalance,
    };
  }, [
    isLoading,
    price,
    token,
    historicalPeriod,
    state.balances.tokenBalancesHistorical,
  ]);
};
