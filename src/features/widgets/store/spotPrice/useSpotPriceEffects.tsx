import { useCallback } from 'react';
import { Effect } from '../../../../store/useStore';
import { getSpotPrices } from '../lib/spotPrice/fetchSpotPrices';
import { getSpotPricesHistorical } from '../lib/spotPrice/fetchSpotPricesHistorical';
import { nativeToken } from './useSpotPriceStore';

export const useSpotPriceEffects = (): Effect => {
  return useCallback<Effect>((state, action, dispatch) => {
    switch (action.type) {
      case 'LOAD_SPOT_PRICE': {
        return (async () => {
          const payload = await getSpotPrices(
            action.payload.ids,
            action.payload.currency
          );

          dispatch({
            type: 'LOAD_SPOT_PRICE_SUCCESS',
            payload,
          });
        })().catch((error) => {
          const payload: Record<string, { error: string }> = {};

          action.payload.ids.forEach(
            (token) =>
              (payload[
                token + (token === '0' ? action.payload.currency : nativeToken)
              ] = { error })
          );

          dispatch({
            type: 'LOAD_SPOT_PRICE_FAILURE',
            payload,
          });
        });
      }

      case 'LOAD_SPOT_PRICE_HISTORICAL': {
        return (async () => {
          const payload = await getSpotPricesHistorical(action.payload);

          dispatch({
            type: 'LOAD_SPOT_PRICE_HISTORICAL_SUCCESS',
            payload,
          });
        })().catch((error) => {
          const payload: Record<string, { error: string }> = {};

          Object.keys(action.payload).forEach(
            (id) => (payload[id] = { error })
          );

          dispatch({
            type: 'LOAD_SPOT_PRICE_HISTORICAL_FAILURE',
            payload,
          });
        });
      }
    }
  }, []);
};
