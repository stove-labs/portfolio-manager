import produce from 'immer';
import { Reducer } from 'react';
import { CurrencyTicker } from '../../../config/config/currencies';
import { ID } from '../../chain/blocks/lib/blocks';
import { WithStatus } from '../../chain/blocks/store/useBlocksStore';
import { persistedSettings } from '../../widgets/containers/WidgetsLayout/store/useWidgetsLayoutStore';
import { getSpotPriceId, SpotPrice } from '../lib/fiat';
import { FiatAction } from './useFiatActions';

export interface FiatState {
  currency: CurrencyTicker;
  spotPrices: Record<ID, WithStatus<SpotPrice>>;
}

export const initialFiatState: FiatState = {
  currency: persistedSettings.currency ?? 'USD',
  spotPrices: {},
};

export const fiatReducer: Reducer<FiatState, FiatAction> = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENCY': {
      return produce(state, (draft) => {
        draft.currency = action.payload.currency;
      });
    }
    case 'LOAD_SPOT_PRICE': {
      return produce(state, (draft) => {
        const { level, currency, token } = action.payload;
        const id = getSpotPriceId(token, currency, level);
        draft.spotPrices[id] = {
          ...draft.spotPrices[id],
          status: 'LOADING',
        };
      });
    }

    case 'LOAD_SPOT_PRICE_SUCCESS': {
      return produce(state, (draft) => {
        const { spotPrice } = action.payload;
        const id = spotPrice.id;
        draft.spotPrices[id] = {
          status: 'SUCCESS',
          data: spotPrice,
        };
      });
    }

    case 'LOAD_SPOT_PRICE_ERROR': {
      return produce(state, (draft) => {
        const { level, currency, token } = action.payload;
        const id = getSpotPriceId(token, currency, level);
        draft.spotPrices[id] = {
          status: 'ERROR',
        };
      });
    }
    default:
      return state;
  }
};
