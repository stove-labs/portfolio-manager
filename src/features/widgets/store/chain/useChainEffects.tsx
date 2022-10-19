import { useCallback } from 'react';
import { Effect } from '../../../../store/useStore';
import { fetchBlock } from '../lib/chain/fetchBlock';
import { fetchLatestBlock } from '../lib/chain/fetchLatestBlock';

export const useChainEffects = (): Effect => {
  return useCallback<Effect>((state, action, dispatch) => {
    switch (action.type) {
      case 'LOAD_LATEST_BLOCK': {
        return (async () => {
          const payload = await fetchLatestBlock();

          dispatch({
            type: 'LOAD_LATEST_BLOCK_SUCCESS',
            payload,
          });
        })().catch((error) => {
          const payload: { error: string } = { error };

          dispatch({
            type: 'LOAD_LATEST_BLOCK_FAILURE',
            payload,
          });
        });
      }

      case 'LOAD_BLOCK': {
        return (async () => {
          const payload = await fetchBlock(action.payload);

          dispatch({
            type: 'LOAD_BLOCK_SUCCESS',
            payload,
          });
        })().catch((error) => {
          const payload: Record<string, { error: string }> = {};

          Object.keys(action.payload).forEach(
            (id: string) => (payload[id] = { error })
          );

          dispatch({
            type: 'LOAD_BLOCK_FAILURE',
            payload,
          });
        });
      }
    }
  }, []);
};
