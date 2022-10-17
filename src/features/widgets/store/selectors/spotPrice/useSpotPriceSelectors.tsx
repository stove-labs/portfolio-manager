import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useStoreContext } from '../../../../../store/useStore';
import { HistoricalPeriod } from '../../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';
import { nativeTokenId } from '../../spotPrice/useSpotPriceStore';

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
      state.prices.spotPrices?.[tokenId + currency]?.price;
    if (!tokenToNativeTokenPrice) return;

    return new BigNumber(tokenToNativeTokenPrice).toFixed(2);
  }, [
    tokenId,
    currency,
    nativeTokenPrice,
    state.prices.spotPrices?.[tokenId + currency],
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
      state.prices.spotPricesHistorical?.[tokenId + currency + historicalPeriod]
        ?.price;

    if (!tokenToNativeTokenPriceHistorical) return;

    return new BigNumber(tokenToNativeTokenPriceHistorical).toFixed(2);
  }, [
    tokenId,
    currency,
    historicalPeriod,
    nativeTokenPrice,
    state.prices.spotPricesHistorical?.[tokenId + currency + historicalPeriod],
  ]);
};

/**
 * Get pool address
 * @param {string} id - token id
 * @returns pool address
 */
export const useSelectPoolId = (id: string): string => {
  const poolsMap: Record<string, string> = {
    '42290944933889': 'KT1K4EwTpbvYN9agJdjpyJm4ZZdhpUNKB3F6',
    '74079757402113': 'KT1X3zxdTzPB9DgVzA3ad6dgZe9JEamoaeRy',
    '24975299837953': 'KT1WBLrLE2vG8SedBqiSJFm4VVAZZBytJYHc',
  };

  const poolId = poolsMap[id];

  if (!poolId) throw new Error("Price pool doesn't exist for selected token");

  return poolId;
};

/**
 * Get token decimals
 * @param {string} id - token id
 * @returns decimals
 */
export const useSelectTokenDecimals = (id: string): string => {
  const decimalsMap: Record<string, string> = {
    '0': '6',
    '42290944933889': '18',
    '74079757402113': '6',
    '24975299837953': '8',
  };

  const decimals = decimalsMap[id];

  if (!decimals) throw new Error("Decimals doesn't exist for selected token");

  return decimals;
};
