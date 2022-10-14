import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useStoreContext } from '../../../../store/useStore';
import { Token } from '../useChainDataStore';
import { Balance } from '../../components/TokenBalanceWidget/TokenBalanceWidget';
import { HistoricalPeriod } from '../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';

/**
 * Get token based on id
 * @param {string} id - id of token
 * @returns Token
 */
export const useSelectToken = (id: string): Token | undefined => {
  const [state] = useStoreContext();

  return useMemo(() => {
    return state.chainData.tokens?.find((token) => token.id === id);
  }, [id]);
};

/**
 * Get all tokens
 * @returns All tokens
 */
export const useSelectAllTokens = (): Token[] => {
  const [state] = useStoreContext();

  return state.chainData.tokens;
};

/**
 * Get loading status for token balance
 * @param {string} id - id of token
 * @returns loading state
 */
export const useSelectIsBalanceLoading = (id: string): boolean => {
  const [state] = useStoreContext();

  return useMemo((): boolean => {
    const tokenBalancesStatus = state.chainData.tokenBalances?.[id]?.status;

    return (
      tokenBalancesStatus === undefined ||
      tokenBalancesStatus === 'LOADING' ||
      tokenBalancesStatus === 'STANDBY'
    );
  }, [id, state.chainData.tokenBalances?.[id]?.status]);
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
      state.chainData.tokenBalancesHistorical?.[id + historicalPeriod]?.status;

    return (
      tokenBalancesHistoricalStatus === undefined ||
      tokenBalancesHistoricalStatus === 'LOADING' ||
      tokenBalancesHistoricalStatus === 'STANDBY'
    );
  }, [
    id,
    historicalPeriod,
    state.chainData.tokenBalancesHistorical?.[id + historicalPeriod]?.status,
  ]);
};

/**
 * Get balance for token
 * @param {Token} token - token
 * @returns Balance
 */
export const useSelectBalance = (token?: Token): Balance => {
  const [state] = useStoreContext();

  return useMemo(() => {
    if (!token) {
      return {
        amount: undefined,
        fiatBalance: { amount: undefined },
      };
    }
    const tokensBalance = state.chainData.tokenBalances?.[token.id];

    return {
      amount: BigNumber(tokensBalance?.balance ?? '0')
        .dividedBy(Math.pow(10, Number(token?.metadata?.decimals ?? '6')))
        .toFixed(Number(token?.metadata?.decimals) ?? 6),
      fiatBalance: { amount: undefined },
    };
  }, [token, state.chainData.tokenBalances]);
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

  return useMemo(() => {
    if (!token) {
      return {
        level: historicalPeriod,
        amount: undefined,
        fiatBalance: { amount: undefined },
      };
    }

    const tokensBalanceHistorical =
      state.chainData.tokenBalancesHistorical?.[token.id + historicalPeriod];

    return {
      level: historicalPeriod,
      amount: BigNumber(tokensBalanceHistorical?.balanceHistorical ?? '0')
        .dividedBy(Math.pow(10, Number(token?.metadata?.decimals ?? '6')))
        .toFixed(Number(token?.metadata?.decimals) ?? 6),
      fiatBalance: { amount: undefined },
    };
  }, [token, historicalPeriod, state.chainData.tokenBalancesHistorical]);
};
