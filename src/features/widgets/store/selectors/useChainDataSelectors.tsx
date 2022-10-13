import { useMemo } from 'react';
import { useStoreContext } from '../../../../store/useStore';
import { Token } from '../useChainDataStore';

/**
 * Get token based on id
 * @param {string} id - id of token
 * @returns Token
 */
export const useSelectToken = (id: string): Token | undefined => {
  const [state] = useStoreContext();

  return useMemo(() => {
    return state.chainData.tokens?.find((token) => token.id === id);
  }, [id]);
};

/**
 * Get all tokens
 * @returns All tokens
 */
export const useSelectAllTokens = (): Token[] => {
  const [state] = useStoreContext();

  return state.chainData.tokens;
};

/**
 * Get loading status for token balance and token balance historical
 * @param {string} id - id of token
 * @returns loading state
 */
export const useIsLoading = (id: string): boolean => {
  const [state] = useStoreContext();

  return useMemo((): boolean => {
    const tokenBalancesStatus = state.chainData.tokenBalances?.[id].status;
    const tokenBalancesHistoricalStatus =
      state.chainData.tokenBalancesHistorical?.[id].status;

    return (
      tokenBalancesStatus === 'LOADING' ||
      tokenBalancesStatus === 'STANDBY' ||
      tokenBalancesHistoricalStatus === 'LOADING' ||
      tokenBalancesHistoricalStatus === 'STANDBY'
    );
  }, [
    id,
    state.chainData.tokenBalances,
    state.chainData.tokenBalancesHistorical,
  ]);
};
