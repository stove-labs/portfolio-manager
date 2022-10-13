import { Reducer, useReducer } from 'react';
import produce from 'immer';
import { HistoricalPeriod } from '../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';

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
  historicalPeriod?: HistoricalPeriod;
  error?: string;
  status: WidgetStatus;
}

export interface ChainDataState {
  tokens: Token[];
  tokenBalances?: Record<string, TokenBalance>;
  tokenBalancesHistorical?: Record<string, TokenBalanceHistorical>;
}

export type ChainDataAction =
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
        { id: string; historicalPeriod: HistoricalPeriod; timestamp: string }
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

export const defaultValues: ChainDataState = {
  tokens: [
    {
      id: '0',
      name: 'Tezos',
      symbol: 'XTZ',
      contract: {
        address: '0',
      },
      metadata: {
        decimals: '6',
      },
    },
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

export const chainDataReducer: Reducer<ChainDataState, ChainDataAction> = (
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

export const useWidgetStore = (): [
  ChainDataState,
  React.Dispatch<ChainDataAction>
] => useReducer(chainDataReducer, initialChainDataState);
