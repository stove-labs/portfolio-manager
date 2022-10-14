import { isEmpty } from 'lodash';

export interface NativeTokenBalanceResponse {
  data: {
    base: string;
    currency: string;
    amount: string;
  };
}
export type Payload = Record<string, { currency: string; price: string }>;
export type PayloadPromise = Promise<Payload>;
export type Settings = Record<
  string,
  { tokenA: string; tokenB: string; timestamp: string }
>;

/**
 * Get token historical prices for selected pairs
 * @param {Settings} settings - Record<tokenA+tokenB, {tokenA, tokenB, timestamp}>
 * @returns Record with historical spot prices
 */
export const getSpotPricesHistorical = async (
  settings: Settings
): PayloadPromise => {
  // Filter out native token settings as we get balance from different api
  const tokenSettings = Object.values(settings).filter(
    (data) => data.tokenA !== 'XTZ'
  );
  const nativeTokenSettings = Object.values(settings).filter(
    (data) => data.tokenA === 'XTZ'
  );
  let payload: Payload = {};

  if (nativeTokenSettings) {
    await Promise.all(
      nativeTokenSettings.map(
        async ({ tokenA, tokenB, timestamp }, i): PayloadPromise => {
          return await getNativeTokenBalance(
            [tokenA, tokenB],
            timestamp,
            Object.keys(settings)[i]
          );
        }
      )
    ).then((resolvedPromises) => {
      resolvedPromises.forEach((record: Payload) => {
        payload = { ...payload, ...record };
      });
    });
  }

  if (isEmpty(tokenSettings)) return payload;

  // TODO implement fetch of non-native tokens

  return payload;
};

/**
 * Get native token historical prices for selected currencies
 * @param {[string, string]} pair - contains native pairs ei XTZ-USD, XTZ-EUR
 * @param {string} timestamp - ISO timestamp
 * @param {string} recordId - recordId
 * @returns Record with historical spot prices
 */
export const getNativeTokenBalance = async (
  pair: [string, string],
  timestamp: string,
  recordId: string
): PayloadPromise => {
  const [XTZ, currency] = pair;
  const response = await fetch(
    `https://api.coinbase.com/v2/prices/${XTZ}-${currency}/spot?date=${timestamp}`
  );
  if (!response.ok) throw new Error(response.statusText);
  const responseData = (await response.json()) as NativeTokenBalanceResponse;

  return {
    [recordId]: {
      price: responseData.data.amount,
      currency: responseData.data.currency,
    },
  };
};
