import { useMemo } from 'react';
import { useStoreContext } from '../../../../../store/useStore';
import { HistoricalPeriod } from '../../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';

export const nativeToken = 'XTZ';
export const defaultCurrency = 'USD';

/**
 * Get native token spot price
 * @param {string} currency - currency symbols ei USD, EUR
 * @returns Spot price
 */
export const useSelectNativeTokenSpotPrice = (
  currency?: string
): string | undefined => {
  const [state] = useStoreContext();
  const currencyToken: string = currency ?? defaultCurrency;

  return useMemo(() => {
    return state.prices.spotPrices?.[nativeToken + currencyToken]?.price;
  }, [
    currencyToken,
    state.prices.spotPrices?.[nativeToken + currencyToken]?.price,
  ]);
};

/**
 * Get native token historical spot price
 * @param {HistoricalPeriod} historicalPeriod - historical period
 * @param {string} currency - currency symbols ei USD, EUR
 * @returns historical spot price
 */
export const useSelectNativeTokenSpotPriceHistorical = (
  historicalPeriod: HistoricalPeriod,
  currency?: string
): string | undefined => {
  const [state] = useStoreContext();
  const currencyToken: string = currency ?? defaultCurrency;

  return useMemo(() => {
    return state.prices.spotPricesHistorical?.[
      nativeToken + currencyToken + historicalPeriod
    ]?.price;
  }, [
    historicalPeriod,
    currencyToken,
    state.prices.spotPrices?.[nativeToken + currencyToken + historicalPeriod]
      ?.price,
  ]);
};

/**
 * Get token spot price in native token
 * @param {string} token - token symbol
 * @param {string} currency - currency symbols ei USD, EUR
 * @returns Spot price
 */
export const useSelectTokenSpotPrice = (
  token?: string,
  currency?: string
): string | undefined => {
  const [state] = useStoreContext();
  const currencyToken: string = currency ?? defaultCurrency;

  return useMemo(() => {
    if (!token) return;
    if (token === nativeToken) return '1';

    const tokenToNativeTokenPrice =
      state.prices.spotPrices?.[token + nativeToken]?.price;
    if (!tokenToNativeTokenPrice) return;

    return tokenToNativeTokenPrice;
  }, [token, state.prices.spotPrices?.[nativeToken + currencyToken]?.price]);
};

/**
 * Get token historical spot price in native token
 * @param {string} token - token symbol
 * @param {HistoricalPeriod} historicalPeriod - historical period
 * @param {string} currency - currency symbols ei USD, EUR
 * @returns Spot price
 */
export const useSelectTokenSpotPriceHistorical = (
  historicalPeriod: HistoricalPeriod,
  token?: string,
  currency?: string
): string | undefined => {
  const [state] = useStoreContext();
  const currencyToken: string = currency ?? defaultCurrency;

  return useMemo(() => {
    if (!token) return;
    if (token === nativeToken) return '1';

    const tokenToNativeTokenPrice =
      state.prices.spotPrices?.[token + nativeToken + historicalPeriod]?.price;
    if (!tokenToNativeTokenPrice) return;

    return tokenToNativeTokenPrice;
  }, [
    token,
    historicalPeriod,
    state.prices.spotPrices?.[nativeToken + currencyToken + historicalPeriod]
      ?.price,
  ]);
};
