import { isEmpty } from 'lodash';

export interface TokenBalanceHistoricalResponse {
  token: { id: string };
  balance: string;
}

/**
 * Get historical token balances for selected ids
 * @param {string} address - wallet address
 * @param {Record} settings - record with id and timestamp
 * @returns JSON with historical balances
 */
export const getTokenBalancesHistorical = async (
  address: string,
  settings: Record<string, { id: string; timestamp: string }>
): Promise<Record<string, { balanceHistorical: string }>> => {
  const tokenIds: string[] = Object.keys(settings).filter(
    (id) => id.length > 5
  );
  const nativeTokenIds: string[] = Object.keys(settings).filter(
    (id) => id.length <= 5
  );

  let payload: Record<string, { balanceHistorical: string }> = {};

  if (nativeTokenIds) {
    const promises: Array<
      Promise<Record<string, { balanceHistorical: string }>>
    > = nativeTokenIds.map(async (id) => {
      return await getNativeTokenBalance(id, address, settings[id].timestamp);
    });

    await Promise.all(promises).then((resolvedPromises) => {
      resolvedPromises.forEach((record) => {
        payload = { ...payload, ...record };
      });
    });
  }

  if (isEmpty(tokenIds)) return payload;

  await Promise.all(
    tokenIds.map(
      async (id): Promise<Record<string, { balanceHistorical: string }>> => {
        const level: string = await getBlockLevel(settings[id].timestamp);

        const response = await fetch(
          `https://api.tzkt.io/v1/tokens/historical_balances/${level}?account=${address}&token.id.in=${settings[id].id}`
        );

        if (!response.ok) throw new Error(response.statusText);

        const responseData =
          (await response.json()) as TokenBalanceHistoricalResponse[];

        responseData.forEach(
          (data) =>
            (payload[id] = {
              balanceHistorical: data.balance ?? '0',
            })
        );

        if (responseData.length === 0)
          tokenIds.forEach((id) => (payload[id] = { balanceHistorical: '0' }));

        return payload;
      }
    )
  ).then((resolvedPromises) => {
    resolvedPromises.forEach((record) => {
      payload = { ...payload, ...record };
    });
  });

  return payload;
};

/**
 * Get historical native token balance
 * @param {string} id - token id + historic period
 * @param {string} address - wallet address
 * @param {string} timestamp - ISO timestamp
 * @returns JSON with balances
 */
export const getNativeTokenBalance = async (
  id: string,
  address: string,
  timestamp: string
): Promise<Record<string, { balanceHistorical: string }>> => {
  const level: string = await getBlockLevel(timestamp);
  const response = await fetch(
    `https://api.tzkt.io/v1/accounts/${address}/balance_history/${level}`
  );

  if (!response.ok) throw new Error(response.statusText);

  const responseData = (await response.json()) as string;

  return { [id]: { balanceHistorical: responseData ?? '0' } };
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
