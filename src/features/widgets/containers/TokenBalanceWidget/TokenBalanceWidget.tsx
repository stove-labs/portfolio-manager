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
  useSelectNativeTokenSpotPrice,
  useSelectCurrency,
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
  const currency = useSelectCurrency();
  const isBalanceLoading = useSelectIsBalanceLoading(settings.token);
  const isBalanceHistoricalLoading = useSelectIsBalanceHistoricalLoading(
    settings.token,
    settings.historicalPeriod
  );
  const isLoading = useMemo(() => {
    return isBalanceLoading || isBalanceHistoricalLoading;
  }, [isBalanceLoading, isBalanceHistoricalLoading]);
  const historicalTimestamp = useMemo(() => {
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
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL',
      payload: {
        [settings.token + settings.historicalPeriod]: {
          id: settings.token,
          historicalPeriod: settings.historicalPeriod,
          timestamp: historicalTimestamp,
        },
      },
    });
  }, [settings.token, settings.historicalPeriod]);

  useEffect(() => {
    dispatch({
      type: 'LOAD_SPOT_PRICE',
      payload: { ids: ['0'], currency },
    });
  }, [currency]);

  useEffect(() => {
    // Native token XTZ has id=0
    dispatch({
      type: 'LOAD_SPOT_PRICE_HISTORICAL',
      payload: {
        ['0' + currency + settings.historicalPeriod]: {
          tokenId: '0',
          currency,
          historicalPeriod: settings.historicalPeriod,
          timestamp: historicalTimestamp,
        },
      },
    });
  }, [currency, settings.historicalPeriod]);

  useEffect(() => {
    // prevent double fetching of native token
    if (settings.token === '0') return;

    dispatch({
      type: 'LOAD_SPOT_PRICE',
      payload: { ids: [settings.token], currency },
    });
  }, [currency, settings.token]);

  useEffect(() => {
    // prevent double fetching of native token
    if (settings.token === '0') return;

    dispatch({
      type: 'LOAD_SPOT_PRICE_HISTORICAL',
      payload: {
        [settings.token + currency + settings.historicalPeriod]: {
          tokenId: settings.token,
          currency,
          historicalPeriod: settings.historicalPeriod,
          timestamp: historicalTimestamp,
        },
      },
    });
  }, [currency, settings.token, settings.historicalPeriod]);

  const balance = useSelectBalance(token);
  const historicalBalance = useSelectBalanceHistorical(
    settings.historicalPeriod,
    token
  );

  const spotPriceNativeToken = useSelectNativeTokenSpotPrice(currency);
  const spotPriceToken = useSelectTokenSpotPrice(currency, settings.token);

  return (
    <TokenBalanceWidgetComponent
      balance={balance}
      historicalBalance={historicalBalance}
      isLoading={isLoading}
      settings={settings}
      spotPriceNativeToken={spotPriceNativeToken}
      spotPriceToken={spotPriceToken}
      token={token}
      onSettingsChange={onSettingsChange}
      onWidgetRemove={onWidgetRemove}
    />
  );
};
