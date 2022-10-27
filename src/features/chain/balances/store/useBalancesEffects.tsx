import { useCallback } from 'react';
import { Effect } from '../../../../store/useStore';
import { fetchBalancesAtBlockLevels } from '../lib/balances';
import { loadBalancesError, loadBalancesSuccess } from './useBalancesActions';

export const useBalancesEffects = (): Effect => {
  return useCallback<Effect>(async (state, action, dispatch) => {
    switch (action.type) {
      case 'LOAD_BALANCES': {
        const { levels, address, tokenIds } = action.payload;
        try {
          const balances = await fetchBalancesAtBlockLevels(
            levels,
            address,
            tokenIds
          );
          dispatch(loadBalancesSuccess(balances));
        } catch (e) {
          console.error(e);
          dispatch(loadBalancesError(levels, address, tokenIds));
        }
        break;
      }
    }
  }, []);
};
