import { useCallback } from 'react';
import { Effect } from '../../../store/useStore';
import { getTokenBalances } from './lib/fetchBalances';
import { getTokenBalancesHistorical } from './lib/fetchBalancesHistorical';

export const useChainDataEffects = (): Effect => {
  return useCallback<Effect>((state, action, dispatch) => {
    switch (action.type) {
      case 'LOAD_TOKENS_BALANCE': {
        return (async () => {
          const address = state.wallet.activeAccount?.address;

          if (!address) {
            throw new Error('No account address detected');
          }

          const payload = await getTokenBalances(address, action.payload.ids);

          dispatch({
            type: 'LOAD_TOKENS_BALANCE_SUCCESS',
            payload,
          });
        })().catch((error) => {
          const payload: Record<string, { error: string }> = {};

          action.payload.ids.forEach((id) => (payload[id] = { error }));

          dispatch({
            type: 'LOAD_TOKENS_BALANCE_FAILURE',
            payload,
          });
        });
      }

      case 'LOAD_TOKENS_BALANCE_HISTORICAL': {
        return (async () => {
          const address = state.wallet.activeAccount?.address;

          if (!address) {
            throw new Error('No account address detected');
          }

          const payload = await getTokenBalancesHistorical(
            address,
            action.payload
          );

          dispatch({
            type: 'LOAD_TOKENS_BALANCE_HISTORICAL_SUCCESS',
            payload,
          });
        })().catch((error) => {
          const payload: Record<string, { error: string }> = {};

          Object.keys(action.payload).forEach(
            (id) => (payload[id] = { error })
          );

          dispatch({
            type: 'LOAD_TOKENS_BALANCE_HISTORICAL_FAILURE',
            payload,
          });
        });
      }
    }
  }, []);
};
