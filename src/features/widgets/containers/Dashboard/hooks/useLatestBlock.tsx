import { useCallback } from 'react';
import { useStoreEvictContext } from '../../../../../store/providers/StoreEvictProvider';
import {
  OnBeforeIntervalCallback,
  usePollRefreshLatestBlock,
} from '../../../../chain/blocks/hooks/usePollRefreshLatestBlock';
import { Block } from '../../../../chain/blocks/lib/blocks';
import { useSelectLatestBlock } from '../../../../chain/blocks/store/useBlocksSelectors';
import { WithStatus } from '../../../../chain/blocks/store/useBlocksStore';
import { useLastKnown } from '../../../../shared/hooks/useLastKnown';

export interface UseLatestBlockReturn {
  latestBlock: WithStatus<Block> | undefined;
  countdown: number;
}
export const useLatestBlock = (): UseLatestBlockReturn => {
  const { evict } = useStoreEvictContext();
  const { known: latestBlock } = useLastKnown<Block>(useSelectLatestBlock());

  const handleBeforeInterval = useCallback<OnBeforeIntervalCallback>(
    (intervalCount) => {
      // before the 3rd interval starts, evict unused entities
      // this will ensure that the entities from the 3rd interval won't be evicted
      // and the entities from the 1st-2nd intervals will be kept if necessary
      console.log('handleBeforeInterval', { intervalCount });
      if (intervalCount > 2) evict();
    },
    [evict]
  );

  const { countdown } = usePollRefreshLatestBlock(handleBeforeInterval);

  return {
    latestBlock,
    countdown,
  };
};
