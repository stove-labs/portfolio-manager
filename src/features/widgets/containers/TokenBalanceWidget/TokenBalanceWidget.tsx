import React, { useMemo } from 'react';
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
    token: 'QUIPU',
    historicalPeriod: '7d',
  },
  onWidgetRemove,
  onSettingsChange,
}) => {
  const [state] = useStoreContext();
  const isLoading = useMemo(() => {
    return (
      state.tokens.tokens.isLoading ||
      state.tokens.tokensBalance.isLoading ||
      state.tokens.tokensBalanceHistorical.isLoading
    );
  }, [
    state.tokens.tokens.isLoading,
    state.tokens.tokensBalance.isLoading,
    state.tokens.tokensBalanceHistorical.isLoading,
  ]);

  const token = useMemo(() => {
    if (isLoading) return;

    return state.tokens.tokens.data?.filter(
      (item) => item.metadata?.symbol === settings.token
    )?.['0'];
  }, [settings, isLoading]);

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

    const tokensBalance = state.tokens.tokensBalance.data?.filter(
      (item) => item.id === token?.id
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
  }, [token]);

  const historicalBalance = useMemo(() => {
    if (token === undefined) return;

    const tokensBalanceHistorical =
      state.tokens.tokensBalanceHistorical.data?.filter(
        (item) => item.id === token.id
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
  }, [token]);

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
