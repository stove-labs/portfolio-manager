import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useStoreContext } from '../../../../../store/useStore';
import { HistoricalPeriod } from '../../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';
import { nativeToken, nativeTokenId } from '../../spotPrice/useSpotPriceStore';

/**
 * Get loading status for token price
 * @param {string} id - id of token
 * @returns loading state
 */
export const useSelectIsPriceLoading = (id: string): boolean => {
  const [state] = useStoreContext();
  const tokenB = id === nativeTokenId ? state.prices.currency : nativeToken;

  return useMemo((): boolean => {
    const priceStatus = state.prices.spotPrices?.[id + tokenB]?.status;

    return (
      priceStatus === undefined ||
      priceStatus === 'LOADING' ||
      priceStatus === 'STANDBY'
    );
  }, [id, state.prices.spotPrices?.[id + tokenB]?.status]);
};

/**
 * Get loading status for token price historical
 * @param {string} id - id of token
 * @param {string} historicalPeriod - historicalPeriod
 * @returns loading state
 */
export const useSelectIsPriceHistoricalLoading = (
  id: string,
  historicalPeriod: string
): boolean => {
  const [state] = useStoreContext();
  const tokenB = id === nativeTokenId ? state.prices.currency : nativeToken;

  return useMemo((): boolean => {
    const priceHistoricalStatus =
      state.prices.spotPricesHistorical?.[id + tokenB + historicalPeriod]
        ?.status;

    return (
      priceHistoricalStatus === undefined ||
      priceHistoricalStatus === 'LOADING' ||
      priceHistoricalStatus === 'STANDBY'
    );
  }, [
    id,
    historicalPeriod,
    state.prices.spotPricesHistorical?.[id + tokenB + historicalPeriod]?.status,
  ]);
};

/**
 * Get currency
 * @returns Currency symbol
 */
export const useSelectCurrency = (): string => {
  const [state] = useStoreContext();

  return useMemo(() => {
    return state.prices.currency;
  }, [state.prices.currency]);
};

/**
 * Get native token spot price
 * @param {string} currency - currency symbols ei USD, EUR
 * @returns Spot price
 */
export const useSelectNativeTokenSpotPrice = (
  currency: string
): string | undefined => {
  const [state] = useStoreContext();

  return useMemo(() => {
    return state.prices.spotPrices?.[nativeTokenId + currency]?.price;
  }, [currency, state.prices.spotPrices?.[nativeTokenId + currency]]);
};

/**
 * Get native token historical spot price
 * @param {HistoricalPeriod} historicalPeriod - historical period
 * @param {string} currency - currency symbols ei USD, EUR
 * @returns historical spot price
 */
export const useSelectNativeTokenSpotPriceHistorical = (
  historicalPeriod: HistoricalPeriod,
  currency: string
): string | undefined => {
  const [state] = useStoreContext();

  return useMemo(() => {
    return state.prices.spotPricesHistorical?.[
      nativeTokenId + currency + historicalPeriod
    ]?.price;
  }, [
    historicalPeriod,
    currency,
    state.prices.spotPricesHistorical?.[
      nativeTokenId + currency + historicalPeriod
    ],
  ]);
};

/**
 * Get token spot price in native token
 * @param {string} currency - currency symbols ei USD, EUR
 * @param {string} tokenId - token id
 * @returns Spot price
 */
export const useSelectTokenSpotPrice = (
  currency: string,
  tokenId: string
): string | undefined => {
  const [state] = useStoreContext();
  const nativeTokenPrice: string | undefined =
    useSelectNativeTokenSpotPrice(currency);

  return useMemo(() => {
    if (!tokenId || !nativeTokenPrice) return;
    if (tokenId === nativeTokenId) return nativeTokenPrice;

    const tokenToNativeTokenPrice: string | undefined =
      state.prices.spotPrices?.[tokenId + nativeToken]?.price;
    if (!tokenToNativeTokenPrice) return;

    return new BigNumber(tokenToNativeTokenPrice)
      .multipliedBy(nativeTokenPrice)
      .toFixed(2);
  }, [
    tokenId,
    currency,
    nativeTokenPrice,
    state.prices.spotPrices?.[tokenId + nativeToken],
  ]);
};

/**
 * Get token historical spot price in native token
 * @param {HistoricalPeriod} historicalPeriod - historical period
 * @param {string} currency - currency symbols ei USD, EUR
 * @param {string} tokenId - token id
 * @returns Spot price
 */
export const useSelectTokenSpotPriceHistorical = (
  historicalPeriod: HistoricalPeriod,
  currency: string,
  tokenId: string
): string | undefined => {
  const [state] = useStoreContext();
  const nativeTokenPrice: string | undefined =
    useSelectNativeTokenSpotPriceHistorical(historicalPeriod, currency);

  return useMemo(() => {
    if (!nativeTokenPrice) return;
    if (tokenId === nativeTokenId) return nativeTokenPrice;

    const tokenToNativeTokenPriceHistorical: string | undefined =
      state.prices.spotPricesHistorical?.[
        tokenId + nativeToken + historicalPeriod
      ]?.price;

    if (!tokenToNativeTokenPriceHistorical) return;

    return new BigNumber(tokenToNativeTokenPriceHistorical)
      .multipliedBy(nativeTokenPrice)
      .toFixed(2);
  }, [
    tokenId,
    currency,
    historicalPeriod,
    nativeTokenPrice,
    state.prices.spotPricesHistorical?.[
      tokenId + nativeToken + historicalPeriod
    ],
  ]);
};
