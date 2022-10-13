import { Reducer, useReducer } from 'react';
import produce from 'immer';

export type WidgetStatus = 'STANDBY' | 'LOADING' | 'SUCCESS' | 'ERROR';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  contract: {
    address: string;
  };
  metadata?: {
    decimals: string;
  };
}

export interface Balance {
  amount: string;
}

export interface Price {
  spotPrice: Balance;
}

export interface TokenBalance {
  balance?: string;
  error?: string;
  status: WidgetStatus;
}

export interface TokenBalanceHistorical {
  balanceHistorical?: string;
  level?: string;
  error?: string;
  status: WidgetStatus;
}

// key is token id
export interface ChainDataState {
  tokens: Token[];
  tokenBalances?: Record<string, TokenBalance>;
  tokenBalancesHistorical?: Record<string, TokenBalanceHistorical>;
}

export type chainDataAction =
  | { type: 'LOAD_TOKENS_BALANCE'; payload: { id: string } }
  | {
      type: 'LOAD_TOKENS_BALANCE_SUCCESS';
      payload: { id: string; balance: string };
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_FAILURE';
      payload: { id: string; error: string };
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL';
      payload: { id: string; level: string };
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL_SUCCESS';
      payload: { id: string; level: string; balanceHistorical: string };
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL_FAILURE';
      payload: { id: string; level: string; error: string };
    };

const defaultValues: ChainDataState = {
  tokens: [
    {
      id: '42290944933889',
      name: 'Kolibri USD',
      symbol: 'kUSD',
      contract: {
        address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
      },
      metadata: {
        decimals: '18',
      },
    },
    {
      id: '74079757402113',
      name: 'Quipuswap',
      symbol: 'QUIPU',
      contract: {
        address: 'KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb',
      },
      metadata: {
        decimals: '6',
      },
    },
    {
      id: '24975299837953',
      name: 'tzBTC',
      symbol: 'tzBTC',
      contract: {
        address: 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn',
      },
      metadata: {
        decimals: '8',
      },
    },
  ],
};

export const initialChainDataState: ChainDataState = defaultValues;

export const chainDataReducer: Reducer<ChainDataState, chainDataAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'LOAD_TOKENS_BALANCE':
      return produce(state, (draft) => {
        draft.tokenBalances = state.tokenBalances ?? {};

        draft.tokenBalances[action.payload.id] = {
          status: 'LOADING',
        };
      });
    case 'LOAD_TOKENS_BALANCE_SUCCESS':
      return produce(state, (draft) => {
        draft.tokenBalances = state.tokenBalances ?? {};

        draft.tokenBalances[action.payload.id] = {
          balance: action.payload.balance,
          status: 'SUCCESS',
        };
      });
    case 'LOAD_TOKENS_BALANCE_FAILURE':
      return produce(state, (draft) => {
        draft.tokenBalances = state.tokenBalances ?? {};

        draft.tokenBalances[action.payload.id] = {
          error: action.payload.error,
          status: 'ERROR',
        };
      });

    case 'LOAD_TOKENS_BALANCE_HISTORICAL':
      return produce(state, (draft) => {
        draft.tokenBalancesHistorical = state.tokenBalancesHistorical ?? {};

        draft.tokenBalancesHistorical[
          action.payload.id + action.payload.level
        ] = {
          level: action.payload.level,
          status: 'LOADING',
        };
      });
    case 'LOAD_TOKENS_BALANCE_HISTORICAL_SUCCESS':
      return produce(state, (draft) => {
        draft.tokenBalancesHistorical = state.tokenBalancesHistorical ?? {};

        draft.tokenBalancesHistorical[
          action.payload.id + action.payload.level
        ] = {
          balanceHistorical: action.payload.balanceHistorical,
          status: 'SUCCESS',
        };
      });
    case 'LOAD_TOKENS_BALANCE_HISTORICAL_FAILURE':
      return produce(state, (draft) => {
        draft.tokenBalancesHistorical = state.tokenBalancesHistorical ?? {};

        draft.tokenBalancesHistorical[
          action.payload.id + action.payload.level
        ] = {
          error: action.payload.error,
          status: 'ERROR',
        };
      });

    default:
      return state;
  }
};

export const useWidgetStore = (): [
  ChainDataState,
  React.Dispatch<chainDataAction>
] => useReducer(chainDataReducer, initialChainDataState);
