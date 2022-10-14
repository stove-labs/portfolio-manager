import React, { useEffect } from 'react';
import moment from 'moment';
import { useStoreContext } from '../../../../store/useStore';
import {
  useSelectIsBalanceLoading,
  useSelectIsBalanceHistoricalLoading,
  useSelectToken,
  useSelectBalance,
  useSelectBalanceHistorical,
} from '../../store/selectors/chainData/useChainDataSelectors';
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
  const [, dispatch] = useStoreContext();
  const token = useSelectToken(settings.token);
  const isBalanceLoading = useSelectIsBalanceLoading(settings.token);
  const isBalanceHistoricalLoading = useSelectIsBalanceHistoricalLoading(
    settings.token,
    settings.historicalPeriod
  );
  const isLoading = isBalanceLoading || isBalanceHistoricalLoading;

  useEffect(() => {
    dispatch({
      type: 'LOAD_TOKENS_BALANCE',
      payload: { ids: [settings.token] },
    });
  }, [settings.token]);

  useEffect(() => {
    dispatch({
      type: 'LOAD_SPOT_PRICE',
      payload: { pairIds: [['XTZ', 'USD']] },
    });
  }, []);

  useEffect(() => {
    const offset: Record<HistoricalPeriod, number> = {
      '24h': 24,
      '7d': 24 * 7,
      '30d': 24 * 30,
    };

    const timestamp: string = moment(Date.now())
      .subtract(offset[settings.historicalPeriod], 'h')
      .toISOString();

    dispatch({
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL',
      payload: {
        [settings.token + settings.historicalPeriod]: {
          id: settings.token,
          historicalPeriod: settings.historicalPeriod,
          timestamp,
        },
      },
    });
  }, [settings.token, settings.historicalPeriod]);

  const balance = useSelectBalance(token);
  const historicalBalance = useSelectBalanceHistorical(
    settings.historicalPeriod,
    token
  );

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
