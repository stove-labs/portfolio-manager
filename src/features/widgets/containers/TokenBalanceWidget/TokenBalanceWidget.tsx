import React, { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useStoreContext } from '../../../../store/useStore';
import {
  Balance,
  TokenBalanceWidget as TokenBalanceWidgetComponent,
  TokenBalanceWidgetSettingsData,
  WidgetProps,
} from './../../components/TokenBalanceWidget/TokenBalanceWidget';

export const TokenBalanceWidget: React.FC<
  WidgetProps<TokenBalanceWidgetSettingsData>
> = ({
  settings = {
    token: 'kUSD',
    historicalPeriod: '7d',
  },
  onWidgetRemove,
  onSettingsChange,
}) => {
  const [state, dispatch] = useStoreContext();
  const token = useMemo(() => {
    if (
      state.widgetData.tokens.status === 'LOADING' ||
      state.widgetData.tokens.status === 'STANDBY'
    )
      return;

    return state.widgetData.tokens.data?.filter(
      (item) => item.metadata?.symbol === settings.token
    )?.['0'];
  }, [settings, state.widgetData.tokens.status]);

  const isLoading: boolean = useMemo((): boolean => {
    if (token === undefined) return true;

    const tokenBalancesStatus = state.widgetData.tokenBalances?.filter(
      (item) => item.tokenId === token?.id
    )?.['0']?.status;
    const tokenBalancesHistoricalStatus =
      state.widgetData.tokenBalancesHistorical?.filter(
        (item) =>
          item.tokenId === token?.id && item.level === settings.historicalPeriod
      )?.['0']?.status;

    return (
      state.widgetData.tokens.status === 'LOADING' ||
      tokenBalancesStatus === 'LOADING' ||
      tokenBalancesHistoricalStatus === 'LOADING'
    );
  }, [
    state.widgetData.tokens,
    state.widgetData.tokenBalances,
    state.widgetData.tokenBalancesHistorical,
  ]);

  useEffect(() => {
    if (token === undefined) return;

    dispatch({
      type: 'LOAD_TOKENS_BALANCE',
      payload: { tokenId: token.id },
    });
  }, [token]);

  useEffect(() => {
    if (token === undefined) return;

    // TODO: calculate level based on historicalPeriod
    const level = '2600000';
    dispatch({
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL',
      payload: { tokenId: token.id, level },
    });
  }, [token, settings.historicalPeriod]);

  const dummyBalance: Balance = {
    amount: '0.005',
    token: {
      id: '0',
      ticker: settings.token,
      fullName: 'Kolibri',
    },
    fiatBalance: {
      amount: '100000',
    },
  };

  const dummyHistoricalBalance: Balance = {
    amount: '50000',
    token: {
      id: '0',
      ticker: 'kUSD',
      fullName: 'Kolibri',
    },
    fiatBalance: {
      amount: '50000',
    },
  };

  const balance = useMemo(() => {
    if (token === undefined) return;

    const tokensBalance = state.widgetData.tokenBalances?.filter(
      (item) => item.tokenId === token?.id
    )?.['0'];

    return {
      token: {
        id: token.id,
        ticker: token.metadata?.symbol ?? '',
        fullName: token.metadata?.name ?? '',
      },
      amount: String(
        BigNumber(tokensBalance?.balance ?? '0').dividedBy(
          Math.pow(10, Number(token?.metadata?.decimals ?? '6'))
        )
      ),
      fiatBalance: { amount: '0' },
    };
  }, [token, state.widgetData.tokenBalances]);

  const historicalBalance = useMemo(() => {
    if (token === undefined) return;

    const tokensBalanceHistorical =
      state.widgetData.tokenBalancesHistorical?.filter(
        (item) => item.tokenId === token.id
      )?.['0'];

    return {
      token: {
        id: token.id,
        ticker: token.metadata?.symbol ?? '',
        fullName: token.metadata?.name ?? '',
      },
      amount: String(
        BigNumber(tokensBalanceHistorical?.balanceHistorical ?? '0').dividedBy(
          Math.pow(10, Number(token?.metadata?.decimals ?? '6'))
        )
      ),
      fiatBalance: { amount: '0' },
    };
  }, [token, state.widgetData.tokenBalancesHistorical]);

  return (
    <TokenBalanceWidgetComponent
      balance={balance ?? dummyBalance}
      historicalBalance={historicalBalance ?? dummyHistoricalBalance}
      isLoading={isLoading}
      settings={settings}
      onSettingsChange={onSettingsChange}
      onWidgetRemove={onWidgetRemove}
    />
  );
};
