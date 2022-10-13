import React, { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useStoreContext } from '../../../../store/useStore';
import { useIsLoading } from '../../store/selectors/useChainDataSelectors';
import {
  TokenBalanceWidget as TokenBalanceWidgetComponent,
  TokenBalanceWidgetSettingsData,
  WidgetProps,
} from './../../components/TokenBalanceWidget/TokenBalanceWidget';

export const TokenBalanceWidget: React.FC<
  WidgetProps<TokenBalanceWidgetSettingsData>
> = ({
  settings = {
    token: {
      id: '42290944933889',
      name: 'Kolibri USD',
      symbol: 'kUSD',
      contract: {
        address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
      },
      metadata: {
        decimals: '18',
      },
    },
    historicalPeriod: '7d',
  },
  onWidgetRemove,
  onSettingsChange,
}) => {
  const [state, dispatch] = useStoreContext();
  const isLoading = useIsLoading(settings.token.id);

  useEffect(() => {
    dispatch({
      type: 'LOAD_TOKENS_BALANCE',
      payload: { id: settings.token.id },
    });
  }, [settings.token]);

  useEffect(() => {
    // TODO: calculate level based on historicalPeriod
    const level = '2600000';
    dispatch({
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL',
      payload: { id: settings.token.id, level },
    });
  }, [settings.token, settings.historicalPeriod]);

  const balance = useMemo(() => {
    const tokensBalance = state.chainData.tokenBalances?.[settings.token.id];

    return {
      token: settings.token,
      amount: String(
        BigNumber(tokensBalance?.balance ?? '0').dividedBy(
          Math.pow(10, Number(settings.token?.metadata?.decimals ?? '6'))
        )
      ),
      fiatBalance: { amount: '0' },
    };
  }, [settings.token, state.chainData.tokenBalances]);

  const historicalBalance = useMemo(() => {
    const tokensBalanceHistorical =
      state.chainData.tokenBalancesHistorical?.[settings.token.id];

    return {
      token: settings.token,
      level: settings.historicalPeriod,
      amount: String(
        BigNumber(tokensBalanceHistorical?.balanceHistorical ?? '0').dividedBy(
          Math.pow(10, Number(settings.token?.metadata?.decimals ?? '6'))
        )
      ),
      fiatBalance: { amount: '0' },
    };
  }, [settings.token, state.chainData.tokenBalancesHistorical]);

  return (
    <TokenBalanceWidgetComponent
      balance={balance}
      historicalBalance={historicalBalance}
      isLoading={isLoading}
      settings={settings}
      onSettingsChange={onSettingsChange}
      onWidgetRemove={onWidgetRemove}
    />
  );
};
