import { tokens, Token } from '../config/tokens';

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
export const getToken = (id: string): Token | undefined => {
  return tokens[id];
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
export const getPoolId = (id: string): string => {
  const poolId = tokens[id].pool?.address;

  if (!poolId) throw new Error("Price pool doesn't exist for selected token");

  return poolId;
};

/**
 * Get token decimals
 * @param {string} id - token id
 * @returns decimals
 */
export const getTokenDecimals = (id: string): string => {
  const decimals = tokens[id].metadata.decimals;

  if (!decimals) throw new Error("Decimals doesn't exist for selected token");

  return decimals;
};
