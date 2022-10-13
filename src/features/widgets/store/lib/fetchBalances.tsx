import { isEmpty } from 'lodash';

export interface TokenBalanceResponse {
  token: { id: string };
  balance: string;
}

/**
 * Get token balances for selected ids
 * @param {string} address - wallet address
 * @param {string} ids - array of ids
 * @returns JSON with balances
 */
export const getTokenBalances = async (
  address: string,
  ids: string[]
): Promise<Record<string, { balance: string }>> => {
  const tokenIds: string[] = ids.filter((id) => id !== '0');
  const payload: Record<string, { balance: string }> = {};

  if (ids.includes('0')) payload['0'] = await getNativeTokenBalance(address);
  if (isEmpty(tokenIds)) return payload;

  const response = await fetch(
    `https://api.tzkt.io/v1/tokens/balances?token.id.in=${tokenIds.join()}&account=${address}&metadata.decimals.ge=1`
  );

  if (!response.ok) throw new Error(response.statusText);

  const responseData = (await response.json()) as TokenBalanceResponse[];

  responseData.forEach(
    (data) => (payload[data.token.id] = { balance: data.balance })
  );

  if (responseData.length === 0)
    tokenIds.forEach((id) => (payload[id] = { balance: '0' }));

  return payload;
};

/**
 * Get native token balance
 * @param {string} address - wallet address
 * @returns JSON with balances
 */
export const getNativeTokenBalance = async (
  address: string
): Promise<{ balance: string }> => {
  const response = await fetch(
    `https://api.tzkt.io/v1/accounts/${address}/balance`
  );

  if (!response.ok) throw new Error(response.statusText);

  const responseData = (await response.json()) as string;

  return { balance: responseData ?? '0' };
};