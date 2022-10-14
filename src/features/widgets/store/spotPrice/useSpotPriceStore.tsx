import { Reducer, useReducer } from 'react';
import produce from 'immer';
import { HistoricalPeriod } from '../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';

export type Status = 'STANDBY' | 'LOADING' | 'SUCCESS' | 'ERROR';

export interface spotPrice {
  price?: string;
  error?: string;
  status: Status;
}

export interface spotPriceHistorical {
  tokanA?: string;
  tokanB?: string;
  price?: string;
  error?: string;
  historicalPeriod?: HistoricalPeriod;
  currency?: string;
  status: Status;
}

export interface SpotPriceState {
  spotPrices?: Record<string, spotPrice>;
  spotPricesHistorical?: Record<string, spotPriceHistorical>;
}

export type SpotPriceAction =
  | { type: 'LOAD_SPOT_PRICE'; payload: { pairIds: Array<[string, string]> } }
  | {
      type: 'LOAD_SPOT_PRICE_SUCCESS';
      payload: Record<string, { currency: string; price: string }>;
    }
  | {
      type: 'LOAD_SPOT_PRICE_FAILURE';
      payload: Record<string, { error: string }>;
    }
  | {
      type: 'LOAD_SPOT_PRICE_HISTORICAL';
      payload: Record<
        string,
        {
          tokenA: string;
          tokenB: string;
          timestamp: string;
        }
      >;
    }
  | {
      type: 'LOAD_SPOT_PRICE_HISTORICAL_SUCCESS';
      payload: Record<string, { currency: string; price: string }>;
    }
  | {
      type: 'LOAD_SPOT_PRICE_HISTORICAL_FAILURE';
      payload: Record<string, { error: string }>;
    };

export const initialSpotPriceState: SpotPriceState = {};

export const spotPriceReducer: Reducer<SpotPriceState, SpotPriceAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'LOAD_SPOT_PRICE':
      return produce(state, (draft) => {
        draft.spotPrices = state.spotPrices ?? {};

        action.payload.pairIds.forEach(([tokenA, tokenB]) => {
          if (draft.spotPrices === undefined) return;

          draft.spotPrices[tokenA + tokenB] = {
            status: 'LOADING',
          };
        });
      });
    case 'LOAD_SPOT_PRICE_SUCCESS':
      return produce(state, (draft) => {
        draft.spotPrices = state.spotPrices ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.spotPrices === undefined) return;

          draft.spotPrices[id] = {
            ...data,
            status: 'SUCCESS',
          };
        });
      });
    case 'LOAD_SPOT_PRICE_FAILURE':
      return produce(state, (draft) => {
        draft.spotPrices = state.spotPrices ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.spotPrices === undefined) return;

          draft.spotPrices[id] = {
            ...data,
            status: 'ERROR',
          };
        });
      });

    case 'LOAD_SPOT_PRICE_HISTORICAL':
      return produce(state, (draft) => {
        draft.spotPricesHistorical = state.spotPricesHistorical ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.spotPricesHistorical === undefined) return;

          draft.spotPricesHistorical[id] = {
            ...data,
            status: 'LOADING',
          };
        });
      });
    case 'LOAD_SPOT_PRICE_HISTORICAL_SUCCESS':
      return produce(state, (draft) => {
        draft.spotPricesHistorical = state.spotPricesHistorical ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.spotPricesHistorical === undefined) return;

          draft.spotPricesHistorical[id] = {
            ...data,
            status: 'SUCCESS',
          };
        });
      });
    case 'LOAD_SPOT_PRICE_HISTORICAL_FAILURE':
      return produce(state, (draft) => {
        draft.spotPricesHistorical = state.spotPricesHistorical ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.spotPricesHistorical === undefined) return;

          draft.spotPricesHistorical[id] = {
            ...data,
            status: 'ERROR',
          };
        });
      });

    default:
      return state;
  }
};

export const useSpotPriceStore = (): [
  SpotPriceState,
  React.Dispatch<SpotPriceAction>
] => useReducer(spotPriceReducer, initialSpotPriceState);
