import React, { useCallback } from 'react';
import {
  OnBeforeIntervalCallback,
  usePollRefreshLatestBlock,
} from './features/chain/blocks/hooks/usePollRefreshLatestBlock';
import { Block } from './features/chain/blocks/lib/blocks';
import { useSelectLatestBlock } from './features/chain/blocks/store/useBlocksSelectors';
import { useLastKnown } from './features/shared/hooks/useLastKnown';
import { useStoreEvictContext } from './store/providers/StoreEvictProvider';

export const Playground: React.FC = () => {
  const { evict } = useStoreEvictContext();
  const { known: latestBlock, selected: futureLatestBlock } =
    useLastKnown<Block>(useSelectLatestBlock);

  const handleBeforeInterval = useCallback<OnBeforeIntervalCallback>(
    (intervalCount) => {
      // before the 3rd interval starts, evict unused entities
      // this will ensure that the entities from the 3rd interval won't be evicted
      // and the entities from the 1st-2nd intervals will be kept if necessary
      if (intervalCount > 2) evict();
    },
    [evict]
  );
  usePollRefreshLatestBlock(handleBeforeInterval);

  return (
    <>
      <h1>Playground</h1>

      <p>Latest block</p>
      <p>Status: {latestBlock?.status ?? '-'}</p>
      <p>Data: {latestBlock?.data?.id ?? '-'}</p>

      <p>Future latest block</p>
      <p>Status: {futureLatestBlock?.status ?? '-'}</p>
      <p>Data: {futureLatestBlock?.data?.id ?? '-'}</p>
    </>
  );
};
