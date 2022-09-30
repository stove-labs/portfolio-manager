import { useCallback } from 'react';
import { Effect } from '../../../store/useStore';

export const useCounterEffects = (): Effect => {
  return useCallback<Effect>((state, action, dispatch) => {
    switch (action.type) {
      case 'INCREMENT_BY_ASYNC': {
        setTimeout(() => {
          dispatch({ type: 'INCREMENT_BY', payload: action.payload });
        }, 3000);
      }
    }
  }, []);
};
