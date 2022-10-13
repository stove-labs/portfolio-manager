import { useMemo } from 'react';
import { State } from '../../../../store/useStore';
import { Token } from '../useChainDataStore';

/**
 * Get token based on id
 * @param {State} State - global state
 * @param {string} id - id of token
 * @returns Token
 */
export const useGetToken = (state: State, id: string): Token => {
  return useMemo(() => {
    return (
      state.chainData.tokens?.find((token) => token.id === id) ??
      state.chainData.tokens['0']
    );
  }, [id]);
};

/**
 * Get all tokens
 * @param {State} State - global state
 * @returns All tokens
 */
export const useGetAllTokens = (state: State): Token[] => {
  return state.chainData.tokens;
};

/**
 * Get loading status for token balance and token balance historical
 * @param {State} State - global state
 * @param {string} id - id of token
 * @returns loading state
 */
export const useIsLoading = (state: State, id: string): boolean => {
  return useMemo((): boolean => {
    const tokenBalancesStatus = state.chainData.tokenBalances?.[id].status;
    const tokenBalancesHistoricalStatus =
      state.chainData.tokenBalancesHistorical?.[id].status;

    return (
      tokenBalancesStatus === 'LOADING' ||
      tokenBalancesHistoricalStatus === 'LOADING'
    );
  }, [
    id,
    state.chainData.tokenBalances,
    state.chainData.tokenBalancesHistorical,
  ]);
};
