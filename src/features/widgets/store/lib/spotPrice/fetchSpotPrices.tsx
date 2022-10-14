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

/**
 * Get native token prices for selected currencies
 * @param {Array<[string, string]>} pairIds - array of token pairs
 * @returns Record with spot prices
 */
export const getSpotPrices = async (
  pairIds: Array<[string, string]>
): PayloadPromise => {
  // Filter out XTZ as we get balance from different api
  const tokenIds: Array<[string, string]> = pairIds.filter(
    (pairId) => pairId[0] !== 'XTZ'
  );
  const nativeTokenIds: Array<[string, string]> = pairIds.filter(
    (pairId) => pairId[1] !== 'XTZ'
  );
  let payload: Payload = {};

  // 0 is XTZ id
  if (nativeTokenIds) {
    await Promise.all(
      nativeTokenIds.map(async (pair: [string, string]): PayloadPromise => {
        return await getNativeTokenBalance(pair);
      })
    ).then((resolvedPromises) => {
      resolvedPromises.forEach((record: Payload) => {
        payload = { ...payload, ...record };
      });
    });
  }

  if (isEmpty(tokenIds)) return payload;

  // TODO implement fetch of non-native tokens

  return payload;
};

/**
 * Get native token balance
 * @param {Array<[string, string]>} pair - contains native pairs ei XTZ-USD, XTZ-EUR
 * @returns Record with spot prices
 */
export const getNativeTokenBalance = async (
  pair: [string, string]
): PayloadPromise => {
  const [XTZ, currency] = pair;
  const response = await fetch(
    `https://api.coinbase.com/v2/prices/${XTZ}-${currency}/spot`
  );

  if (!response.ok) throw new Error(response.statusText);

  const responseData = (await response.json()) as NativeTokenBalanceResponse;

  return {
    [XTZ + currency]: {
      price: responseData.data.amount,
      currency: responseData.data.currency,
    },
  };
};
