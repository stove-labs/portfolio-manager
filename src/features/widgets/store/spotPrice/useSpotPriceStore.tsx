import { Reducer, useReducer } from 'react';
import produce from 'immer';
import { HistoricalPeriod } from '../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';
import { Block } from '../chain/useChainStore';
import {
  currencies,
  Currency,
  CurrencySymbol,
} from '../../../../config/config/currencies';

export type Status = 'STANDBY' | 'LOADING' | 'SUCCESS' | 'ERROR';

export interface spotPrice {
  token?: string;
  currency?: string;
  price?: string;
  error?: string;
  status: Status;
}

export interface spotPriceHistorical {
  token?: string;
  currency?: string;
  price?: string;
  error?: string;
  historicalPeriod?: HistoricalPeriod;
  status: Status;
}

export interface SpotPriceState {
  spotPrices?: Record<string, spotPrice>;
  spotPricesHistorical?: Record<string, spotPriceHistorical>;
  currency: Currency;
}

export type SpotPriceAction =
  | { type: 'SET_CURRENCY'; payload: CurrencySymbol }
  | { type: 'LOAD_SPOT_PRICE'; payload: { ids: string[]; currency: string } }
  | {
      type: 'LOAD_SPOT_PRICE_SUCCESS';
      payload: Record<string, { price: string }>;
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
          tokenId: string;
          currency: string;
          historicalPeriod: HistoricalPeriod;
          historicalBlock: Block;
        }
      >;
    }
  | {
      type: 'LOAD_SPOT_PRICE_HISTORICAL_SUCCESS';
      payload: Record<string, { price: string }>;
    }
  | {
      type: 'LOAD_SPOT_PRICE_HISTORICAL_FAILURE';
      payload: Record<string, { error: string }>;
    };

export const initialSpotPriceState: SpotPriceState = {
  currency: {
    symbol: 'USD',
    position: 'left',
  },
};

export const nativeToken = 'XTZ';
export const nativeTokenId = '0';

export const spotPriceReducer: Reducer<SpotPriceState, SpotPriceAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'SET_CURRENCY':
      return produce(state, (draft) => {
        draft.currency = currencies[action.payload];
      });
    case 'LOAD_SPOT_PRICE':
      return produce(state, (draft) => {
        draft.spotPrices = state.spotPrices ?? {};

        action.payload.ids.forEach((token) => {
          if (draft.spotPrices === undefined) return;
          const currency: CurrencySymbol | 'XTZ' =
            token === '0' ? state.currency.symbol : nativeToken;

          draft.spotPrices[token + currency] = {
            token,
            currency,
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
          const currency: CurrencySymbol | 'XTZ' =
            data.tokenId === '0' ? state.currency.symbol : nativeToken;

          draft.spotPricesHistorical[id] = {
            ...data,
            currency,
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
