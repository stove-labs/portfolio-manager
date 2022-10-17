import { isEmpty } from 'lodash';
import { BigNumber } from 'bignumber.js';
import {
  getNativeTokenBalance,
  getTokenBalances,
} from '../chainData/fetchBalances';
import { nativeToken, nativeTokenId } from '../../spotPrice/useSpotPriceStore';
import {
  useSelectPoolId,
  useSelectTokenDecimals,
} from '../../selectors/spotPrice/useSpotPriceSelectors';

export interface NativeTokenBalanceResponse {
  data: {
    base: string;
    currency: string;
    amount: string;
  };
}
export type Payload = Record<string, { price: string }>;
export type PayloadPromise = Promise<Payload>;

/**
 * Get native token prices for selected currencies
 * @param {string[]} ids - array of token ids
 * @param {string} currency - currency symbols ei USD, EUR
 * @returns Record with spot prices Record<tokenId+currency, {price, currency}>
 */
export const getSpotPrices = async (
  ids: string[],
  currency: string
): PayloadPromise => {
  // Filter out XTZ as we get balance from different api
  const tokenIds: string[] | undefined = ids.filter((id) => id !== '0');
  const isNativeToken: boolean = ids.includes('0');
  let payload: Payload = {};

  if (isNativeToken) {
    payload = await getNativeTokenSpotPrice(currency);
  }

  if (isEmpty(tokenIds)) return payload;

  await Promise.all(
    tokenIds.map(async (id): PayloadPromise => {
      return await getTokenSpotPrice(id, currency);
    })
  ).then((resolvedPromises) => {
    resolvedPromises.forEach((record: Payload) => {
      payload = { ...payload, ...record };
    });
  });

  return payload;
};

/**
 * Get native token spot price
 * @param {string} currency - contains currency symbol USD, EUR etc
 * @returns Record with spot prices Record<nativeTokenId+currency, {price, currency}>
 */
export const getNativeTokenSpotPrice = async (
  currency: string
): PayloadPromise => {
  const response = await fetch(
    `https://api.coinbase.com/v2/prices/${nativeToken}-${currency}/spot`
  );

  if (!response.ok) throw new Error(response.statusText);

  const responseData = (await response.json()) as NativeTokenBalanceResponse;

  return {
    ['0' + currency]: {
      price: responseData.data.amount,
    },
  };
};

/**
 * Get token spot price, we calculated from pool native and token balance
 * @param {string} tokenId - token id
 * @param {string} currency - currency symbols ei USD, EUR
 * @returns Record with spot prices Record<token+currency, {price, currency}>
 */
export const getTokenSpotPrice = async (
  tokenId: string,
  currency: string
): PayloadPromise => {
  const poolAddress: string = useSelectPoolId(tokenId);
  const nativeTokenDecimal: string = useSelectTokenDecimals(nativeTokenId);
  const tokenDecimal: string = useSelectTokenDecimals(tokenId);
  const nativeTokenPrice: string = Object.values(
    await getNativeTokenSpotPrice(currency)
  )?.['0']?.price;
  const tokenBalance: string = Object.values(
    await getTokenBalances(poolAddress, [tokenId])
  )?.['0']?.balance;
  const nativeTokenBalance: string = Object.values(
    await getNativeTokenBalance(poolAddress)
  )?.['0']?.balance;

  if (!nativeTokenBalance || !tokenBalance || !nativeTokenPrice)
    throw new Error(
      'Could not calculate price due to missing nativeTokenBalance, tokenBalance or nativeTokenPrice'
    );

  const nativeTokenBalanceWithDecimals = BigNumber(
    nativeTokenBalance
  ).dividedBy(10 ** Number(nativeTokenDecimal));

  const tokenBalanceWithDecimals = BigNumber(tokenBalance).dividedBy(
    10 ** Number(tokenDecimal)
  );

  // We calculate spot price by division fo token balance and native token balance of xyk pool
  // which we then multiple with native token fiat price
  const price: string = nativeTokenBalanceWithDecimals
    .dividedBy(tokenBalanceWithDecimals)
    .multipliedBy(nativeTokenPrice)
    .toFixed(2);

  return {
    [tokenId + currency]: {
      price,
    },
  };
};