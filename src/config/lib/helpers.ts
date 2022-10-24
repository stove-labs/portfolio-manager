import { tokens, Token } from '../config/tokens';

export type KnownToken = keyof typeof tokens;

/**
 * Check if token is native
 * @param {Token} token - token
 * @returns boolean
 */
export const isNativeToken = (token: Token | undefined): boolean => {
  return token ? token.id === '0' : false;
};

/**
 * Get token based on id
 * @param {string} id - id of token
 * @returns Token
 */
// TODO: hooks so the value is memoized
export const getToken = (id: KnownToken): Token => {
  return tokens[id];
};

/**
 * Get native token, without specifying it's ID
 * @returns
 */
export const getNativeToken = (): Token => {
  return getToken('0');
};

/**
 * Get all tokens
 * @returns All tokens
 */
export const getAllTokens = (): Token[] => {
  return Object.values(tokens);
};

/**
 * Get pool address
 * @param {string} id - token id
 * @returns pool address
 */
export const getPoolId = (id: KnownToken): string => {
  const poolId = tokens[id].pool?.address;

  if (!poolId) throw new Error("Price pool doesn't exist for selected token");

  return poolId;
};

/**
 * Get token decimals
 * @param {string} id - token id
 * @returns decimals
 */
export const getTokenDecimals = (id: KnownToken): string => {
  const decimals = tokens[id].metadata.decimals;

  if (!decimals) throw new Error("Decimals doesn't exist for selected token");

  return decimals;
};
