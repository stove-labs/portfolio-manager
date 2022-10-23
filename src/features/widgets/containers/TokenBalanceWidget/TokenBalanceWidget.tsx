import React from 'react';
import { getToken } from '../../../../config/lib/helpers';
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
    // TODO: rename token -> tokenId
    token: '42290944933889',
    historicalPeriod: '7d',
  },
  onWidgetRemove,
  onSettingsChange,
}) => {
  // const [, dispatch] = useStoreContext();
  const token = getToken(settings.token);
  const currency = 'USD';
  // const block = useSelectLatestBlock();
  // const historicalBlock = block;
  // const historicalBlock = useSelectBlockHistorical(
  //   settings.historicalPeriod,
  //   block?.level
  // );

  // // Balances
  // const balance = useSelectBalance(token);
  // const historicalBalance = useSelectBalanceHistorical(
  //   settings.historicalPeriod,
  //   token
  // );

  const balance: Balance = {
    amount: '0',
    fiatBalance: {
      amount: '0',
    },
  };

  const historicalBalance = balance;

  // // Prices
  // const spotPriceNativeToken = useSelectNativeTokenSpotPrice(currency);
  // const spotPriceToken = useSelectTokenSpotPrice(currency, settings.token);

  const spotPriceNativeToken = '1';
  const spotPriceToken = '1';

  // const isBlockLoading = useSelectIsBlockLoading();
  // const isBalanceLoading = useSelectIsBalanceLoading(settings.token);
  // const isBalanceHistoricalLoading = useSelectIsBalanceHistoricalLoading(
  //   settings.token,
  //   settings.historicalPeriod
  // );
  // const isPriceLoading = useSelectIsPriceLoading(settings.token);
  // const isPriceHistoricalLoading = useSelectIsPriceHistoricalLoading(
  //   settings.token,
  //   settings.historicalPeriod
  // );

  const isLoading = false;

  // const isLoading = useMemo(() => {
  //   return (
  //     isBalanceLoading ||
  //     isBalanceHistoricalLoading ||
  //     isBlockLoading ||
  //     isPriceLoading ||
  //     isPriceHistoricalLoading
  //   );
  // }, [
  //   isBalanceLoading,
  //   isBalanceHistoricalLoading,
  //   isBlockLoading,
  //   isPriceLoading,
  //   isPriceHistoricalLoading,
  // ]);

  // const historicalTimestamp: string | undefined = useMemo(() => {
  //   if (!block?.timestamp) return;
  //   const offset: Record<HistoricalPeriod, number> = {
  //     '24h': 24,
  //     '7d': 24 * 7,
  //     '30d': 24 * 30,
  //   };

  //   return moment(block?.timestamp)
  //     .subtract(offset[settings.historicalPeriod], 'h')
  //     .toISOString();
  // }, [block?.timestamp, settings.historicalPeriod]);

  // useEffect(() => {
  //   if (!historicalBlock?.level) return;
  //   // Native token XTZ has id=0
  //   dispatch({
  //     type: 'LOAD_SPOT_PRICE_HISTORICAL',
  //     payload: {
  //       ['0' + currency + settings.historicalPeriod]: {
  //         tokenId: '0',
  //         currency,
  //         historicalPeriod: settings.historicalPeriod,
  //         historicalBlock,
  //       },
  //     },
  //   });
  // }, [historicalBlock?.level, currency, settings.historicalPeriod]);

  // useEffect(() => {
  //   if (!historicalTimestamp || !block?.level) return;

  //   // dispatch({
  //   //   type: 'LOAD_BLOCK',
  //   //   payload: {
  //   //     [block.level + settings.historicalPeriod]: {
  //   //       timestamp: historicalTimestamp,
  //   //       historicalPeriod: settings.historicalPeriod,
  //   //     },
  //   //   },
  //   // });
  // }, [historicalTimestamp, block?.level, settings.historicalPeriod]);

  // useEffect(() => {
  //   dispatch({
  //     type: 'LOAD_TOKENS_BALANCE',
  //     payload: { ids: [settings.token] },
  //   });
  // }, [block?.level, settings.token]);

  // useEffect(() => {
  //   if (!historicalBlock?.level) return;

  //   // dispatch({
  //   //   type: 'LOAD_TOKENS_BALANCE_HISTORICAL',
  //   //   payload: {
  //   //     [settings.token + settings.historicalPeriod]: {
  //   //       id: settings.token,
  //   //       historicalPeriod: settings.historicalPeriod,
  //   //       level: historicalBlock.level,
  //   //     },
  //   //   },
  //   // });
  // }, [historicalBlock?.level, settings.token, settings.historicalPeriod]);

  // useEffect(() => {
  //   // prevent double fetching of native token
  //   if (settings.token === '0') return;

  //   dispatch({
  //     type: 'LOAD_SPOT_PRICE',
  //     payload: { ids: [settings.token], currency },
  //   });
  // }, [block?.level, currency, settings.token]);

  // useEffect(() => {
  //   // prevent double fetching of native token
  //   if (!historicalBlock?.level || settings.token === '0') return;

  //   dispatch({
  //     type: 'LOAD_SPOT_PRICE_HISTORICAL',
  //     payload: {
  //       [settings.token + nativeToken + settings.historicalPeriod]: {
  //         tokenId: settings.token,
  //         currency,
  //         historicalPeriod: settings.historicalPeriod,
  //         historicalBlock,
  //       },
  //     },
  //   });
  // }, [
  //   historicalBlock?.level,
  //   currency,
  //   settings.token,
  //   settings.historicalPeriod,
  // ]);

  return (
    <TokenBalanceWidgetComponent
      balance={balance}
      currency={currency}
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
