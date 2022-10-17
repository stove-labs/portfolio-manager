import { isEmpty } from 'lodash';

export interface TokenBalanceResponseItem {
  id: string;
  balance: string;
}
export type TokenBalanceResponse = TokenBalanceResponseItem[];
export type Payload = Record<string, { balance: string }>;
export type PayloadPromise = Promise<Payload>;

export const defaultBalance: string = '0';

/**
 * Get token balances for selected ids
 * @param {string} address - wallet address
 * @param {string} ids - array of ids
 * @returns Record with balances
 */
export const getTokenBalances = async (
  address: string,
  ids: string[]
): PayloadPromise => {
  // Filter out XTZ as we get balance from different api
  const tokenIds: string[] = ids.filter((id) => id !== '0');
  let payload: Payload = {};

  // 0 is XTZ id
  if (ids.includes('0')) payload = await getNativeTokenBalance(address);
  if (isEmpty(tokenIds)) return payload;

  const response = await fetch(
    `https://api.tzkt.io/v1/tokens/balances?token.id.in=${tokenIds.join()}&account=${address}&select=balance,token.id as id`
  );

  if (!response.ok) throw new Error(response.statusText);

  const responseData = (await response.json()) as TokenBalanceResponse;

  responseData.forEach(
    (data) => (payload[data.id] = { balance: data.balance ?? defaultBalance })
  );

  // API only returns existing balances, fill zero balances
  tokenIds.forEach(
    (id) =>
      (payload[id] = {
        balance: payload[id].balance ?? defaultBalance,
      })
  );

  return payload;
};

/**
 * Get native token balance
 * @param {string} address - wallet address
 * @returns Record with balances
 */
export const getNativeTokenBalance = async (
  address: string
): Promise<Payload> => {
  const response = await fetch(
    `https://api.tzkt.io/v1/accounts/${address}/balance`
  );

  if (!response.ok) throw new Error(response.statusText);

  const responseData = (await response.json()) as string;

  return { '0': { balance: responseData ?? defaultBalance } };
};
