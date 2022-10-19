import { Reducer, useReducer } from 'react';
import produce from 'immer';
import { HistoricalPeriod } from '../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';

export type Status = 'STANDBY' | 'LOADING' | 'SUCCESS' | 'ERROR';

export interface Balance {
  amount: string;
}

export interface Price {
  spotPrice: Balance;
}

export interface TokenBalance {
  balance?: string;
  error?: string;
  status: Status;
}

export interface TokenBalanceHistorical {
  balanceHistorical?: string;
  historicalPeriod?: HistoricalPeriod;
  error?: string;
  status: Status;
}

export interface BalanceState {
  tokenBalances?: Record<string, TokenBalance>;
  tokenBalancesHistorical?: Record<string, TokenBalanceHistorical>;
}

export type BalanceAction =
  | { type: 'LOAD_TOKENS_BALANCE'; payload: { ids: string[] } }
  | {
      type: 'LOAD_TOKENS_BALANCE_SUCCESS';
      payload: Record<string, { balance: string }>;
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_FAILURE';
      payload: Record<string, { error: string }>;
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL';
      payload: Record<
        string,
        { id: string; historicalPeriod: HistoricalPeriod; level: string }
      >;
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL_SUCCESS';
      payload: Record<string, { balanceHistorical: string }>;
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL_FAILURE';
      payload: Record<string, { error: string }>;
    };

export const initialBalanceState: BalanceState = {};

export const balanceReducer: Reducer<BalanceState, BalanceAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'LOAD_TOKENS_BALANCE':
      return produce(state, (draft) => {
        draft.tokenBalances = state.tokenBalances ?? {};

        action.payload.ids.forEach((id) => {
          if (draft.tokenBalances === undefined) return;

          draft.tokenBalances[id] = {
            status: 'LOADING',
          };
        });
      });
    case 'LOAD_TOKENS_BALANCE_SUCCESS':
      return produce(state, (draft) => {
        draft.tokenBalances = state.tokenBalances ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.tokenBalances === undefined) return;

          draft.tokenBalances[id] = {
            ...data,
            status: 'SUCCESS',
          };
        });
      });
    case 'LOAD_TOKENS_BALANCE_FAILURE':
      return produce(state, (draft) => {
        draft.tokenBalances = state.tokenBalances ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.tokenBalances === undefined) return;

          draft.tokenBalances[id] = {
            ...data,
            status: 'ERROR',
          };
        });
      });

    case 'LOAD_TOKENS_BALANCE_HISTORICAL':
      return produce(state, (draft) => {
        draft.tokenBalancesHistorical = state.tokenBalancesHistorical ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.tokenBalancesHistorical === undefined) return;

          draft.tokenBalancesHistorical[id] = {
            ...data,
            status: 'LOADING',
          };
        });
      });
    case 'LOAD_TOKENS_BALANCE_HISTORICAL_SUCCESS':
      return produce(state, (draft) => {
        draft.tokenBalancesHistorical = state.tokenBalancesHistorical ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.tokenBalancesHistorical === undefined) return;

          draft.tokenBalancesHistorical[id] = {
            ...data,
            status: 'SUCCESS',
          };
        });
      });
    case 'LOAD_TOKENS_BALANCE_HISTORICAL_FAILURE':
      return produce(state, (draft) => {
        draft.tokenBalancesHistorical = state.tokenBalancesHistorical ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.tokenBalancesHistorical === undefined) return;

          draft.tokenBalancesHistorical[id] = {
            ...data,
            status: 'ERROR',
          };
        });
      });

    default:
      return state;
  }
};

export const useBalanceStore = (): [
  BalanceState,
  React.Dispatch<BalanceAction>
] => useReducer(balanceReducer, initialBalanceState);
