import { useMemo } from 'react';
import { useStoreContext } from '../../../../store/useStore';
import { Block } from '../lib/blocks';
import { BlocksState, WithStatus } from './useBlocksStore';

// get blocks from state
export const useSelectBlocks = (): BlocksState => {
  const [state] = useStoreContext();
  return useMemo<BlocksState>(() => {
    return state.blocks;
  }, [state]);
};

// get last selected block, through latest block id
export const useSelectLatestBlock = (): WithStatus<Block> | undefined => {
  const blocks = useSelectBlocks();
  const latestBlockId = useMemo(() => blocks.latestBlockId, [blocks]);
  return useMemo<WithStatus<Block> | undefined>(() => {
    return latestBlockId ? blocks.blocks[latestBlockId] : undefined;
  }, [blocks, latestBlockId]);
};
