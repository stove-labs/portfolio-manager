import React, { useEffect, useMemo } from 'react';
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
  useSelectTokenSpotPrice,
  useSelectTokenSpotPriceHistorical,
  useSelectNativeTokenSpotPrice,
  useSelectNativeTokenSpotPriceHistorical,
} from '../../store/selectors/spotPrice/useSpotPriceSelectors';
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
  const timestamp = useMemo(() => {
    const offset: Record<HistoricalPeriod, number> = {
      '24h': 24,
      '7d': 24 * 7,
      '30d': 24 * 30,
    };

    return moment(Date.now())
      .subtract(offset[settings.historicalPeriod], 'h')
      .toISOString();
  }, [settings.historicalPeriod]);

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
    const tokenA = 'XTZ';
    const tokenB = 'USD';

    dispatch({
      type: 'LOAD_SPOT_PRICE_HISTORICAL',
      payload: {
        [tokenA + tokenB + settings.historicalPeriod]: {
          tokenA,
          tokenB,
          historicalPeriod: settings.historicalPeriod,
          timestamp,
        },
      },
    });
  }, [settings.token, settings.historicalPeriod]);

  useEffect(() => {
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

  const spotPriceNativeToken = useSelectNativeTokenSpotPrice();
  const spotPriceNativeTokenHistorical =
    useSelectNativeTokenSpotPriceHistorical(settings.historicalPeriod);
  const spotPriceToken = useSelectTokenSpotPrice(token?.symbol);
  const spotPriceTokenHistorical = useSelectTokenSpotPriceHistorical(
    settings.historicalPeriod,
    token?.symbol
  );

  return (
    <TokenBalanceWidgetComponent
      balance={balance}
      historicalBalance={historicalBalance}
      isLoading={isLoading}
      settings={settings}
      spotPriceNativeToken={spotPriceNativeToken}
      spotPriceNativeTokenHistorical={spotPriceNativeTokenHistorical}
      spotPriceToken={spotPriceToken}
      spotPriceTokenHistorical={spotPriceTokenHistorical}
      token={token}
      onSettingsChange={onSettingsChange}
      onWidgetRemove={onWidgetRemove}
    />
  );
};
