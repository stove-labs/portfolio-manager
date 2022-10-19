import { isEmpty } from 'lodash';
import { BigNumber } from 'bignumber.js';
import { HistoricalPeriod } from '../../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';
import { getPoolId, getTokenDecimals } from '../../../../../config/lib/helpers';
import { nativeToken, nativeTokenId } from '../../spotPrice/useSpotPriceStore';
import {
  getNativeTokenBalanceHistorical,
  getTokenBalancesHistorical,
} from '../balance/fetchBalancesHistorical';
import { Block } from '../../chain/useChainStore';
export interface NativeTokenBalanceResponse {
  data: {
    base: string;
    currency: string;
    amount: string;
  };
}
export type Payload = Record<string, { price: string }>;
export type PayloadPromise = Promise<Payload>;
export interface SettingsItem {
  tokenId: string;
  historicalPeriod: HistoricalPeriod;
  currency: string;
  historicalBlock: Block;
}
export type Settings = Record<string, SettingsItem>;

/**
 * Get token historical prices for selected pairs
 * @param {Settings} settings - Record<tokenA+tokenB+historicalPeriod, {tokenId, currency, historicPeriod, timestamp}>
 * @param {string} currency - currency symbols ei USD, EUR
 * @returns Record with historical spot prices Record<tokenA+tokenB+historicalPeriod, {price}>
 */
export const getSpotPricesHistorical = async (
  settings: Settings
): PayloadPromise => {
  // Filter out native token settings as we get balance from different api
  const tokenSettings: Array<[string, SettingsItem]> | undefined =
    Object.entries(settings).filter(
      ([, data]) => data.tokenId !== nativeTokenId
    );
  const nativeTokenSettings: [string, SettingsItem] | undefined =
    Object.entries(settings).find(([, data]) => data.tokenId === nativeTokenId);
  let payload: Payload = {};

  if (nativeTokenSettings) {
    const [recordId, { currency, historicalBlock }] = nativeTokenSettings;
    const record = await getNativeTokenSpotPriceHistorical(
      recordId,
      currency,
      historicalBlock.timestamp
    );

    payload = { ...payload, ...record };
  }

  if (isEmpty(tokenSettings)) return payload;

  await Promise.all(
    tokenSettings.map(
      async ([
        recordId,
        { tokenId, historicalPeriod, historicalBlock },
      ]): PayloadPromise => {
        return await getTokenSpotPriceHistorical(
          recordId,
          tokenId,
          historicalPeriod,
          historicalBlock
        );
      }
    )
  ).then((resolvedPromises) => {
    resolvedPromises.forEach((record: Payload) => {
      payload = { ...payload, ...record };
    });
  });

  return payload;
};

/**
 * Get native token historical prices for selected currencies
 * @param {string} currency - contains currency symbol USD, EUR etc
 * @param {string} timestamp - ISO timestamp
 * @param {string} recordId - recordId
 * @returns Record with historical spot prices Record<tokenA+tokenB+historicalPeriod, {price}>
 */
export const getNativeTokenSpotPriceHistorical = async (
  recordId: string,
  currency: string,
  timestamp?: string
): PayloadPromise => {
  if (!timestamp)
    throw new Error(
      'Could not load spot price historical because of missing timestamp'
    );
  const response = await fetch(
    `https://api.coinbase.com/v2/prices/${nativeToken}-${currency}/spot?date=${timestamp}`
  );
  if (!response.ok) throw new Error(response.statusText);
  const responseData = (await response.json()) as NativeTokenBalanceResponse;

  return {
    [recordId]: {
      price: responseData.data.amount,
    },
  };
};

/**
 * Get token spot price historical, we calculated from pool native and token balance
 * @param {string} recordId - recordId
 * @param {string} tokenId - token id
 * @param {HistoricalPeriod} historicalPeriod - historical period
 * @param {string} currency - currency symbols ei USD, EUR
 * @param {string} level - block
 * @returns Record with historical spot prices Record<token+currency+historicalPeriod, {price}>
 */
export const getTokenSpotPriceHistorical = async (
  recordId: string,
  tokenId: string,
  historicPeriod: HistoricalPeriod,
  historicalBlock: Block
): PayloadPromise => {
  if (!historicalBlock.timestamp || !historicalBlock.level)
    throw new Error(
      'Could not load spot price historical because of missing historical block'
    );
  const poolAddress: string = getPoolId(tokenId);
  const nativeTokenDecimal: string = getTokenDecimals(nativeTokenId);
  const tokenDecimal: string = getTokenDecimals(tokenId);
  const tokenBalanceHistorical: string = Object.values(
    await getTokenBalancesHistorical(poolAddress, {
      [tokenId + historicPeriod]: { id: tokenId, level: historicalBlock.level },
    })
  )?.['0']?.balanceHistorical;
  const nativeTokenBalanceHistorical: string = Object.values(
    await getNativeTokenBalanceHistorical(
      recordId,
      poolAddress,
      historicalBlock.level
    )
  )?.['0']?.balanceHistorical;

  if (!tokenBalanceHistorical || !nativeTokenBalanceHistorical)
    throw new Error(
      'Could not calculate price due to missing nativeTokenBalanceHistorical, tokenBalanceHistorical or nativeTokenPriceHistorical'
    );

  const nativeTokenBalanceHistoricalWithDecimals = BigNumber(
    nativeTokenBalanceHistorical
  ).dividedBy(10 ** Number(nativeTokenDecimal));

  const tokenBalanceHistoricalWithDecimals = BigNumber(
    tokenBalanceHistorical
  ).dividedBy(10 ** Number(tokenDecimal));

  // We calculate spot price by division fo token balance and native token balance of xyk pool
  // which we then multiple with native token fiat price
  const price: string = nativeTokenBalanceHistoricalWithDecimals
    .dividedBy(tokenBalanceHistoricalWithDecimals)
    .toFixed(2);

  return {
    [recordId]: {
      price,
    },
  };
};
