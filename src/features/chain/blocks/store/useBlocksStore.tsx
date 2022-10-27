import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { Reducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Block, ID, Timestamp } from '../lib/blocks';
import {
  EntityWithID,
  evictEntities,
} from '../../../../store/providers/StoreEvictProvider';
import { BlocksAction } from './useBlocksActions';

export type Status = 'STANDBY' | 'LOADING' | 'SUCCESS' | 'ERROR';
export interface WithStatus<T extends EntityWithID> {
  status: Status;
  data?: T;
}

export type BlockWithTimestamps = Block & {
  timestamps: Timestamp[];
};

export interface BlocksState {
  latestBlockId?: ID;
  blocks: Record<ID, WithStatus<BlockWithTimestamps>>;
}

export const initialBlocksState: BlocksState = {
  blocks: {},
};

export const latestBlockPseudoTimestamp = 'LATEST';

export const setBlock = (
  draft: WritableDraft<BlocksState>,
  block: Block
): void => {
  const existingTimestamps = draft.blocks[block.id]?.data?.timestamps;
  const newTimestamps = (existingTimestamps ?? []).concat([block.timestamp]);

  const blockWithTimestamps: BlockWithTimestamps = {
    ...block,
    timestamps: newTimestamps,
  };

  draft.blocks[block.id] = {
    status: 'SUCCESS',
    data: blockWithTimestamps,
  };
};

// special index identifying the latest block, which doesn't have a timestamp yet
export const blocksReducer: Reducer<BlocksState, BlocksAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'LOAD_LATEST_BLOCK': {
      const id = uuidv4();
      return produce(state, (draft) => {
        // set a temporary id so that we can find and access the latest block state
        draft.latestBlockId = id;
        draft.blocks[id] = {
          status: 'LOADING',
        };
      });
    }
    case 'LOAD_LATEST_BLOCK_SUCCESS': {
      return produce(state, (draft) => {
        const block = action.payload.block;
        const oldLatestBlockId = state.latestBlockId;
        // update the latestBlockId with the new actual block id
        draft.latestBlockId = block.id;
        // delete block with the old id
        oldLatestBlockId && delete draft.blocks[oldLatestBlockId];
        // set the block to the state
        setBlock(draft, block);
      });
    }
    case 'LOAD_LATEST_BLOCK_ERROR': {
      return produce(state, (draft) => {
        const latestBlockId = state.latestBlockId;
        if (latestBlockId) {
          draft.blocks[latestBlockId] = {
            ...draft.blocks[latestBlockId],
            status: 'ERROR',
          };
        }
      });
    }

    // TODO: implement keep across all selectors before keeping eviciton enabled permanently
    case 'EVICT': {
      return produce(state, (draft) => {
        const entities = draft.blocks;
        draft.blocks = evictEntities(entities, action.payload.keepIDs);
      });
    }

    default:
      return state;
  }
};
