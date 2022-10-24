import BigNumber from 'bignumber.js';
import {
  getNativeToken,
  getToken,
  KnownToken,
} from '../../../../config/lib/helpers';
import { ID, Level } from '../../blocks/lib/blocks';
import config from './../../../../config/config/environment';

export interface Balance {
  // ID = blockLevel-address-tokenId
  id: ID;
  amount: string;
}

export const getBalanceId = (
  level: Level,
  address: string,
  tokenId: KnownToken
): string => `${level}-${address}-${tokenId}`;

export type FetchNativeBalanceAtBlockResponse = string;

export const getNativeBalanceURL = (address: string, level: Level): string =>
  `${config.API_URL}/v1/accounts/${address}/balance_history/${level}`;

export const fetchNativeBalanceAtBlockLevel = async (
  level: Level,
  address: string
): Promise<Balance> => {
  const url = getNativeBalanceURL(address, level);
  const response = await fetch(url);
  if (!response.ok) throw new Error(await response.text());
  const body =
    await (response.json() as Promise<FetchNativeBalanceAtBlockResponse>);

  // get the ID of the native token
  const tokenId = getNativeToken().id;
  const id = getBalanceId(level, address, tokenId);
  const balance: Balance = {
    id,
    amount: body,
  };

  return balance;
};

export interface FetchNonNativeBalanceResponseItem {
  balance: string;
  ['token.id']: string;
}

export type FetchNonNativeBalanceResponse = FetchNonNativeBalanceResponseItem[];

export const getNonNativeBalanceURL = (
  level: Level,
  address: string,
  tokenIds: KnownToken[]
): string => {
  const queryParams: string = [
    `account.eq=${address}`,
    `token.id.in=${tokenIds.join(',')}`,
    'select=balance,token.id',
  ].join('&');
  return `${config.API_URL}/v1/tokens/historical_balances/${level}?${queryParams}`;
};

export const fetchNonNativeBalancesAtBlockLevel = async (
  level: Level,
  address: string,
  tokenIds: KnownToken[]
): Promise<Balance[]> => {
  if (tokenIds.length === 0)
    throw new Error('You must specify at least one tokenId');
  const url = getNonNativeBalanceURL(level, address, tokenIds);
  const response = await fetch(url);
  if (!response.ok) throw new Error(await response.text());
  let body = await (response.json() as Promise<FetchNonNativeBalanceResponse>);
  console.log('body', body);

  // if there are no balances returned ([]), then pretend we received a zero balance resposne array
  if (!body.length) {
    body = tokenIds.map((tokenId) => {
      return {
        'token.id': tokenId,
        balance: '0',
      };
    });
  }

  const balances: Balance[] = body.map((balanceResponseItem) => {
    const id = getBalanceId(level, address, balanceResponseItem['token.id']);
    return {
      id,
      amount: balanceResponseItem.balance,
    };
  });
  return balances;
};

export const fetchBalancesAtBlockLevel = async (
  level: Level,
  address: string,
  tokenIds: KnownToken[]
): Promise<Balance[]> => {
  let balances: Balance[] = [];

  // native balance
  const nativeTokenId = getNativeToken().id;
  const shouldFetchNativeBalance = tokenIds.includes(nativeTokenId);
  if (shouldFetchNativeBalance) {
    const nativeBalance = await fetchNativeBalanceAtBlockLevel(level, address);
    balances.push(nativeBalance);
  }

  // non native balance
  const nonNativeTokenIds = tokenIds.filter(
    (tokenId) => tokenId !== nativeTokenId
  );

  if (nonNativeTokenIds.length > 0) {
    const nonNativeBalances = await fetchNonNativeBalancesAtBlockLevel(
      level,
      address,
      nonNativeTokenIds
    );
    balances = balances.concat(nonNativeBalances);
  }

  return balances;
};

export const fetchBalancesAtBlockLevels = async (
  levels: Level[],
  address: string,
  tokenIds: KnownToken[]
): Promise<Balance[]> => {
  const balances: Array<Promise<Balance[]>> = [];
  // fetch balances for all tokenIds at all requested levels
  levels.forEach((level) => {
    const additionalBalances = fetchBalancesAtBlockLevel(
      level,
      address,
      tokenIds
    );

    balances.push(additionalBalances);
  });

  const resolvedBalances = (await Promise.all(balances)).reduce(
    (balances, balancesAtLevel) => {
      balances.concat(balancesAtLevel);
      return balances;
    }
  );

  return resolvedBalances;
};
export const MAX_DECIMALS = 6;

export const toDecimals = (balance: Balance, tokenId: KnownToken): string => {
  const {
    metadata: { decimals },
  } = getToken(tokenId);
  return new BigNumber(balance.amount)
    .dividedBy(new BigNumber(10).pow(decimals))
    .toFixed(MAX_DECIMALS);
};
