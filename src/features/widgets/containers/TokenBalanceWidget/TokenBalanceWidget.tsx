import React, { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useStoreContext } from '../../../../store/useStore';
import {
  useIsLoading,
  useSelectToken,
} from '../../store/selectors/useChainDataSelectors';
import { HistoricalPeriod } from '../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';
import {
  TokenBalanceWidget as TokenBalanceWidgetComponent,
  TokenBalanceWidgetSettingsData,
  WidgetProps,
} from './../../components/TokenBalanceWidget/TokenBalanceWidget';

export const TokenBalanceWidget: React.FC<
  WidgetProps<TokenBalanceWidgetSettingsData>
> = ({
  settings = {
    token: '42290944933889',
    historicalPeriod: '7d',
  },
  onWidgetRemove,
  onSettingsChange,
}) => {
  const [state, dispatch] = useStoreContext();
  const token = useSelectToken(settings.token);
  const isLoading = useIsLoading(settings.token, settings.historicalPeriod);

  useEffect(() => {
    dispatch({
      type: 'LOAD_TOKENS_BALANCE',
      payload: { ids: [settings.token] },
    });
  }, [settings.token]);

  useEffect(() => {
    const offset: Record<HistoricalPeriod, number> = {
      '24h': 1,
      '7d': 7,
      '30d': 30,
    };

    const date: Date = new Date();
    const timestamp: string = new Date(
      date.setDate(date.getDate() - offset[settings.historicalPeriod])
    ).toISOString();

    dispatch({
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL',
      payload: {
        [settings.token + settings.historicalPeriod]: {
          id: settings.token ,
          historicalPeriod: settings.historicalPeriod,
          timestamp,
        },
      },
    });
  }, [settings.token, settings.historicalPeriod]);

  const balance = useMemo(() => {
    if (isLoading) return;

    const tokensBalance = state.chainData.tokenBalances?.[settings.token];

    return {
      amount: String(
        BigNumber(tokensBalance?.balance ?? '0').dividedBy(
          Math.pow(10, Number(token?.metadata?.decimals ?? '6'))
        )
      ),
      fiatBalance: { amount: '0' },
    };
  }, [token, isLoading]);

  const historicalBalance = useMemo(() => {
    if (isLoading) return;

    const tokensBalanceHistorical =
      state.chainData.tokenBalancesHistorical?.[
        settings.token + settings.historicalPeriod
      ];

    return {
      level: settings.historicalPeriod,
      amount: String(
        BigNumber(tokensBalanceHistorical?.balanceHistorical ?? '0').dividedBy(
          Math.pow(10, Number(token?.metadata?.decimals ?? '6'))
        )
      ),
      fiatBalance: { amount: '0' },
    };
  }, [token, settings, isLoading]);

  return (
    <TokenBalanceWidgetComponent
      balance={balance}
      historicalBalance={historicalBalance}
      isLoading={isLoading}
      settings={settings}
      token={token}
      onSettingsChange={onSettingsChange}
      onWidgetRemove={onWidgetRemove}
    />
  );
};
