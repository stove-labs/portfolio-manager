import React, { useEffect, useMemo } from 'react';
import moment from 'moment';
import { useStoreContext } from '../../../../store/useStore';
import {
  useSelectIsBalanceLoading,
  useSelectIsBalanceHistoricalLoading,
  useSelectToken,
  useSelectBalance,
  useSelectBalanceHistorical,
} from '../../store/selectors/balance/useBalanceSelectors';
import { HistoricalPeriod } from '../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';
import {
  useSelectTokenSpotPrice,
  useSelectNativeTokenSpotPrice,
  useSelectCurrency,
  useSelectIsPriceLoading,
  useSelectIsPriceHistoricalLoading,
} from '../../store/selectors/spotPrice/useSpotPriceSelectors';
import {
  useSelectBlockHistorical,
  useSelectCurrentBlock,
  useSelectIsBlockLoading,
} from '../../store/selectors/chain/useChainSelectors';
import { nativeToken } from '../../store/spotPrice/useSpotPriceStore';
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
  const block = useSelectCurrentBlock();
  const historicalBlock = useSelectBlockHistorical(
    settings.historicalPeriod,
    block?.level
  );
  // Balances
  const balance = useSelectBalance(token);
  const historicalBalance = useSelectBalanceHistorical(
    settings.historicalPeriod,
    token
  );
  // Prices
  const spotPriceNativeToken = useSelectNativeTokenSpotPrice(currency);
  const spotPriceToken = useSelectTokenSpotPrice(currency, settings.token);

  const isBlockLoading = useSelectIsBlockLoading();
  const isBalanceLoading = useSelectIsBalanceLoading(settings.token);
  const isBalanceHistoricalLoading = useSelectIsBalanceHistoricalLoading(
    settings.token,
    settings.historicalPeriod
  );
  const isPriceLoading = useSelectIsPriceLoading(settings.token);
  const isPriceHistoricalLoading = useSelectIsPriceHistoricalLoading(
    settings.token,
    settings.historicalPeriod
  );

  const isLoading = useMemo(() => {
    return (
      isBalanceLoading ||
      isBalanceHistoricalLoading ||
      isBlockLoading ||
      isPriceLoading ||
      isPriceHistoricalLoading
    );
  }, [
    isBalanceLoading,
    isBalanceHistoricalLoading,
    isBlockLoading,
    isPriceLoading,
    isPriceHistoricalLoading,
  ]);

  const historicalTimestamp: string | undefined = useMemo(() => {
    if (!block?.timestamp) return;
    const offset: Record<HistoricalPeriod, number> = {
      '24h': 24,
      '7d': 24 * 7,
      '30d': 24 * 30,
    };

    return moment(block?.timestamp)
      .subtract(offset[settings.historicalPeriod], 'h')
      .toISOString();
  }, [block?.timestamp, settings.historicalPeriod]);

  useEffect(() => {
    if (!historicalBlock?.level) return;
    // Native token XTZ has id=0
    dispatch({
      type: 'LOAD_SPOT_PRICE_HISTORICAL',
      payload: {
        ['0' + currency + settings.historicalPeriod]: {
          tokenId: '0',
          currency,
          historicalPeriod: settings.historicalPeriod,
          historicalBlock,
        },
      },
    });
  }, [historicalBlock?.level, currency, settings.historicalPeriod]);

  useEffect(() => {
    if (!historicalTimestamp || !block?.level) return;

    dispatch({
      type: 'LOAD_BLOCK',
      payload: {
        [block.level + settings.historicalPeriod]: {
          timestamp: historicalTimestamp,
          historicalPeriod: settings.historicalPeriod,
        },
      },
    });
  }, [historicalTimestamp, block?.level, settings.historicalPeriod]);

  useEffect(() => {
    dispatch({
      type: 'LOAD_TOKENS_BALANCE',
      payload: { ids: [settings.token] },
    });
  }, [block?.level, settings.token]);

  useEffect(() => {
    if (!historicalBlock?.level) return;

    dispatch({
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL',
      payload: {
        [settings.token + settings.historicalPeriod]: {
          id: settings.token,
          historicalPeriod: settings.historicalPeriod,
          level: historicalBlock.level,
        },
      },
    });
  }, [historicalBlock?.level, settings.token, settings.historicalPeriod]);

  useEffect(() => {
    // prevent double fetching of native token
    if (settings.token === '0') return;

    dispatch({
      type: 'LOAD_SPOT_PRICE',
      payload: { ids: [settings.token], currency },
    });
  }, [block?.level, currency, settings.token]);

  useEffect(() => {
    // prevent double fetching of native token
    if (!historicalBlock?.level || settings.token === '0') return;

    dispatch({
      type: 'LOAD_SPOT_PRICE_HISTORICAL',
      payload: {
        [settings.token + nativeToken + settings.historicalPeriod]: {
          tokenId: settings.token,
          currency,
          historicalPeriod: settings.historicalPeriod,
          historicalBlock,
        },
      },
    });
  }, [
    historicalBlock?.level,
    currency,
    settings.token,
    settings.historicalPeriod,
  ]);

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
