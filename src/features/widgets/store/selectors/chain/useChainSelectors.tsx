import { useMemo } from 'react';
import { useStoreContext } from '../../../../../store/useStore';
import { HistoricalPeriod } from '../../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';
import { Block } from '../../chain/useChainStore';

/**
 * Get loading status for block
 * @param {string} id - id of token
 * @returns loading state
 */
export const useSelectIsBlockLoading = (): boolean => {
  const [state] = useStoreContext();

  return useMemo((): boolean => {
    const blockStatus = state.chain.currentBlock?.status;

    return (
      blockStatus === undefined ||
      blockStatus === 'LOADING' ||
      blockStatus === 'STANDBY'
    );
  }, [state.chain.currentBlock?.status]);
};

/**
 * Get current block
 * @returns current block
 */
export const useSelectCurrentBlock = (): Block | undefined => {
  const [state] = useStoreContext();

  return useMemo(() => {
    return state.chain.currentBlock;
  }, [state.chain.currentBlock]);
};

/**
 * Get historical block
 * @returns historical block
 */
export const useSelectBlockHistorical = (
  historicalPeriod: HistoricalPeriod,
  level?: string
): Block | undefined => {
  const [state] = useStoreContext();

  return useMemo(() => {
    if (!level) return;
    return state.chain.blocksHistorical?.[level + historicalPeriod];
  }, [
    level,
    historicalPeriod,
    state.chain.blocksHistorical?.[(level ?? '') + historicalPeriod],
  ]);
};
