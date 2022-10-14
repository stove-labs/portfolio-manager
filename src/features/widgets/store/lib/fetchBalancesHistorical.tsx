import { isEmpty } from 'lodash';

export interface TokenBalanceHistoricalResponseItem {
  id: string;
  balance: string;
}
export type TokenBalanceHistoricalResponse =
  TokenBalanceHistoricalResponseItem[];
export type Payload = Record<string, { balanceHistorical: string }>;
export type PayloadPromise = Promise<Payload>;

export const defaultBalance: string = '0';

/**
 * Get historical token balances for selected ids
 * @param {string} address - wallet address
 * @param {Record} settings - Record<id + historicalPeriod, { id, timestamp }>
 * @returns JSON with historical balances
 */
export const getTokenBalancesHistorical = async (
  address: string,
  settings: Record<string, { id: string; timestamp: string }>
): PayloadPromise => {
  // We use id + historicalPeriod as record key
  // Filter out XTZ as we get balance from different api
  const addressLength: number = 5;
  const tokenIds: string[] = Object.keys(settings).filter(
    (recordId) => recordId.length > addressLength
  );
  const nativeTokenIds: string[] = Object.keys(settings).filter(
    (recordId) => recordId.length <= addressLength
  );

  let payload: Payload = {};

  if (nativeTokenIds) {
    await Promise.all(
      nativeTokenIds.map(async (recordId: string): PayloadPromise => {
        return await getNativeTokenBalanceHistorical(
          recordId,
          address,
          settings[recordId].timestamp
        );
      })
    ).then((resolvedPromises) => {
      resolvedPromises.forEach((record: Payload) => {
        payload = { ...payload, ...record };
      });
    });
  }

  if (isEmpty(tokenIds)) return payload;

  await Promise.all(
    tokenIds.map(async (recordId: string): PayloadPromise => {
      const level: string = await getBlockLevel(settings[recordId].timestamp);
      const response = await fetch(
        `https://api.tzkt.io/v1/tokens/historical_balances/${level}?account=${address}&token.id.in=${settings[recordId].id}&select=balance,token.id as id`
      );
      if (!response.ok) throw new Error(response.statusText);
      const responseData =
        (await response.json()) as TokenBalanceHistoricalResponse;

      responseData.forEach(
        (data) =>
          (payload[recordId] = {
            balanceHistorical: data.balance ?? defaultBalance,
          })
      );

      // API only returns existing balances, fill zero balances
      tokenIds.forEach(
        (recordId) =>
          (payload[recordId] = {
            balanceHistorical:
              payload[recordId].balanceHistorical ?? defaultBalance,
          })
      );

      return payload;
    })
  ).then((resolvedPromises) => {
    resolvedPromises.forEach((record) => {
      payload = { ...payload, ...record };
    });
  });

  return payload;
};

/**
 * Get historical native token balance
 * @param {string} recordId - token id + historicalPeriod
 * @param {string} address - wallet address
 * @param {string} timestamp - ISO timestamp
 * @returns Record<id, balanceHistorical>
 */
export const getNativeTokenBalanceHistorical = async (
  recordId: string,
  address: string,
  timestamp: string
): PayloadPromise => {
  const level: string = await getBlockLevel(timestamp);
  const response = await fetch(
    `https://api.tzkt.io/v1/accounts/${address}/balance_history/${level}`
  );
  if (!response.ok) throw new Error(response.statusText);
  const responseData = (await response.json()) as string;

  return { [recordId]: { balanceHistorical: responseData ?? defaultBalance } };
};

/**
 * Get block level from timestamp
 * @param {string} timestamp - ISO timestamp
 * @returns level
 */
export const getBlockLevel = async (timestamp: string): Promise<string> => {
  const response = await fetch(
    `https://api.tzkt.io/v1/blocks/${timestamp}/level`
  );
  if (!response.ok) throw new Error(response.statusText);
  const responseData = (await response.json()) as string;

  return responseData;
};
