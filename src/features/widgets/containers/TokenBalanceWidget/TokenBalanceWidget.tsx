import React, { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useStoreContext } from '../../../../store/useStore';
import {
  useIsLoading,
  useSelectToken,
} from '../../store/selectors/useChainDataSelectors';
import {
  TokenBalanceWidget as TokenBalanceWidgetComponent,
  TokenBalanceWidgetSettingsData,
  WidgetProps,
} from './../../components/TokenBalanceWidget/TokenBalanceWidget';

export const TokenBalanceWidget: React.FC<
  WidgetProps<TokenBalanceWidgetSettingsData>
> = ({
  settings = {
    id: '42290944933889',
    historicalPeriod: '7d',
  },
  onWidgetRemove,
  onSettingsChange,
}) => {
  const [state, dispatch] = useStoreContext();
  const token = useSelectToken(settings.id);
  // TODO: calculate level based on historicalPeriod
  const isLoading = useIsLoading(settings.id, '2600000');

  useEffect(() => {
    dispatch({
      type: 'LOAD_TOKENS_BALANCE',
      payload: { id: settings.id },
    });
  }, [settings.id]);

  useEffect(() => {
    // TODO: calculate level based on historicalPeriod
    const level = '2600000';
    dispatch({
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL',
      payload: { id: settings.id, level },
    });
  }, [settings.id, settings.historicalPeriod]);

  const balance = useMemo(() => {
    if (isLoading) return;

    const tokensBalance = state.chainData.tokenBalances?.[settings.id];

    return {
      amount: String(
        BigNumber(tokensBalance?.balance ?? '0').dividedBy(
          Math.pow(10, Number(token?.metadata?.decimals ?? '6'))
        )
      ),
      fiatBalance: { amount: '0' },
    };
  }, [token, settings.id, isLoading]);

  const historicalBalance = useMemo(() => {
    if (isLoading) return;

    const tokensBalanceHistorical =
      state.chainData.tokenBalancesHistorical?.[
        settings.id + settings.historicalPeriod
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
