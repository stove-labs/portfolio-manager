import { Block, ID } from '../lib/blocks';

// TODO: move to a separate file
export interface EvictAction {
  type: 'EVICT';
  payload: { keepIDs: ID[] };
}

export type BlocksAction =
  | {
      type: 'LOAD_LATEST_BLOCK';
    }
  | {
      type: 'LOAD_LATEST_BLOCK_SUCCESS';
      payload: { block: Block };
    }
  | {
      type: 'LOAD_LATEST_BLOCK_ERROR';
    }
  | EvictAction;

export const loadLatestBlock = (): BlocksAction => {
  return {
    type: 'LOAD_LATEST_BLOCK',
  };
};

export const loadLatestBlockSuccess = (block: Block): BlocksAction => {
  return {
    type: 'LOAD_LATEST_BLOCK_SUCCESS',
    payload: { block },
  };
};

export const loadLatestBlockError = (): BlocksAction => {
  return {
    type: 'LOAD_LATEST_BLOCK_ERROR',
  };
};
