import { useCallback } from 'react';
import { Effect } from '../../../../store/useStore';
import { Block, fetchLatestBlock } from '../lib/blocks';
import {
  loadLatestBlockError,
  loadLatestBlockSuccess,
} from './useBlocksActions';

export const useBlocksEffects = (): Effect => {
  return useCallback<Effect>(async (state, action, dispatch) => {
    switch (action.type) {
      case 'LOAD_LATEST_BLOCK': {
        let block: Block | undefined;

        // try to fetch the block by timestamp, or just the latest one
        try {
          block = await fetchLatestBlock();
        } catch (e) {
          // if there is an error with the lib, dispatch an error action
          dispatch(loadLatestBlockError());

          throw e;
        }

        // if the block was found, dispatch a success action
        block && dispatch(loadLatestBlockSuccess(block));
        break;
      }
    }
  }, []);
};
