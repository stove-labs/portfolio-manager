import BigNumber from 'bignumber.js';
import moment from 'moment';
import { useMemo } from 'react';
import { useStoreContext } from '../../../../store/useStore';
import { useLastKnown } from '../../../shared/hooks/useLastKnown';
import { Block, Level } from '../lib/blocks';
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

export const useSelectLatestBlockLevel = (): Level | undefined => {
  const { known: latestBlock } = useLastKnown(useSelectLatestBlock());
  return useMemo(() => latestBlock?.data?.level, [latestBlock]);
};

// 30s = 30000ms
export const BLOCK_TIME = 30 * 1000;
// 60s in 1m, 60m in 1h = 3600s in 1h, 1h in ms = 3600s * 1000
export const BLOCKS_PER_HOUR = (60 * 60 * 1000) / BLOCK_TIME;
export const hoursToBlocksCount = (hours: string): string => {
  return new BigNumber(hours).multipliedBy(BLOCKS_PER_HOUR).toFixed(0);
};

export const blockCountToHours = (blockCount: string): string => {
  return new BigNumber(blockCount).dividedBy(BLOCKS_PER_HOUR).toFixed(0);
};

export const levelToDateString = (latestBlock: Block, level: Level): string => {
  const levelDiff = new BigNumber(latestBlock.level).minus(level).toFixed(0);
  const hoursDiff = blockCountToHours(levelDiff);

  // date from block timestamp in seconds
  const dateAtLevel = moment
    .unix(Number(latestBlock.timestamp) / 1000)
    .subtract(hoursDiff, 'hours')
    .format('YYYY-MM-DD');

  return dateAtLevel.toString();
};

export const useSelectRelativeHistoricalLevelHoursAgo = (
  hoursAgo: string
): Level | undefined => {
  const latestLevel = useSelectLatestBlockLevel();
  return useMemo(() => {
    if (!latestLevel) return;
    const subBlocks = hoursToBlocksCount(hoursAgo);
    const relativeHistoricalLevel = new BigNumber(latestLevel)
      .minus(subBlocks)
      .toFixed(0);

    if (new BigNumber(relativeHistoricalLevel).isNaN()) return;

    return relativeHistoricalLevel;
  }, [latestLevel, hoursAgo]);
};
