import { useCallback } from 'react';
import { Effect } from '../../../store/useStore';
import { getNativeTokenSpotPriceAtLevel } from '../lib/fiat';
import { loadSpotPriceError, loadSpotPriceSuccess } from './useFiatActions';

export const useFiatEffects = (): Effect => {
  return useCallback<Effect>(async (state, action, dispatch) => {
    switch (action.type) {
      case 'LOAD_SPOT_PRICE': {
        const { currency, latestBlock, level, token } = action.payload;
        try {
          const spotPrice = await getNativeTokenSpotPriceAtLevel(
            currency,
            latestBlock,
            level
          );
          dispatch(loadSpotPriceSuccess(spotPrice));
        } catch (e) {
          dispatch(loadSpotPriceError(token, currency, latestBlock, level));
        }

        break;
      }
    }
  }, []);
};
