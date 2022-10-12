import { Reducer, useReducer } from 'react';
import produce from 'immer';

export type WidgetStatus = 'STANDBY' | 'LOADING' | 'SUCCESS' | 'ERROR';

export interface Token {
  id: string;
  contract?: {
    alias: string;
    address: string;
  };
  metadata?: {
    name: string;
    symbol: string;
    decimals: string;
  };
}

export interface TokenBalance {
  tokenId: string;
  balance?: string;
  error?: string;
  status: WidgetStatus;
}

export interface TokenBalanceHistorical {
  tokenId: string;
  balanceHistorical?: string;
  level: string;
  error?: string;
  status: WidgetStatus;
}

export interface ChainDataState {
  tokens: {
    data?: Token[];
    status: WidgetStatus;
    error?: string;
  };
  tokenBalances?: TokenBalance[];
  tokenBalancesHistorical?: TokenBalanceHistorical[];
}

export type chainDataAction =
  | { type: 'LOAD_TOKENS' }
  | { type: 'LOAD_TOKENS_SUCCESS'; payload: { data: Token[] } }
  | { type: 'LOAD_TOKENS_FAILURE'; payload: { error: string } }
  | { type: 'LOAD_TOKENS_BALANCE'; payload: { tokenId: string } }
  | {
      type: 'LOAD_TOKENS_BALANCE_SUCCESS';
      payload: { tokenId: string; balance: string };
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_FAILURE';
      payload: { tokenId: string; error: string };
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL';
      payload: { tokenId: string; level: string };
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL_SUCCESS';
      payload: { tokenId: string; level: string; balanceHistorical: string };
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL_FAILURE';
      payload: { tokenId: string; level: string; error: string };
    };

const defaultValues: ChainDataState = {
  tokens: {
    data: [],
    status: 'STANDBY',
  },
};

export const initialChainDataState: ChainDataState = defaultValues;

export const chainDataReducer: Reducer<ChainDataState, chainDataAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'LOAD_TOKENS':
      return produce(state, (draft) => {
        draft.tokens.status = 'LOADING';
      });
    case 'LOAD_TOKENS_SUCCESS':
      return produce(state, (draft) => {
        draft.tokens.status = 'SUCCESS';
        draft.tokens.data = action.payload.data;
      });
    case 'LOAD_TOKENS_FAILURE':
      return produce(state, (draft) => {
        draft.tokens.status = 'ERROR';
        draft.tokens.error = action.payload.error;
      });

    case 'LOAD_TOKENS_BALANCE':
      return produce(state, (draft) => {
        draft.tokenBalances = state.tokenBalances;
        const index = (state.tokenBalances ?? []).findIndex(
          (i) => i.tokenId === action.payload.tokenId
        );

        if (index === -1) {
          draft.tokenBalances = [
            ...(draft.tokenBalances ?? []),
            { tokenId: action.payload.tokenId, status: 'LOADING' },
          ];
        } else {
          (draft.tokenBalances ?? [])[index].status = 'LOADING';
        }
      });
    case 'LOAD_TOKENS_BALANCE_SUCCESS':
      return produce(state, (draft) => {
        draft.tokenBalances = (state.tokenBalances ?? []).map(
          (tokenBalance) => {
            if (tokenBalance.tokenId === action.payload.tokenId) {
              return {
                ...tokenBalance,
                balance: action.payload.balance,
                status: 'SUCCESS',
              };
            }

            return tokenBalance;
          }
        );
      });
    case 'LOAD_TOKENS_BALANCE_FAILURE':
      return produce(state, (draft) => {
        draft.tokenBalances = (state.tokenBalances ?? []).map(
          (tokenBalance) => {
            if (tokenBalance.tokenId === action.payload.tokenId) {
              return {
                ...tokenBalance,
                error: action.payload.error,
                status: 'ERROR',
              };
            }

            return tokenBalance;
          }
        );
      });

    case 'LOAD_TOKENS_BALANCE_HISTORICAL':
      return produce(state, (draft) => {
        draft.tokenBalancesHistorical = state.tokenBalancesHistorical;

        const index = (draft.tokenBalancesHistorical ?? []).findIndex(
          (i) =>
            i.tokenId === action.payload.tokenId &&
            i.level === action.payload.level
        );
        if (index === -1) {
          draft.tokenBalancesHistorical = [
            ...(draft.tokenBalancesHistorical ?? []),
            {
              tokenId: action.payload.tokenId,
              level: action.payload.level,
              status: 'LOADING',
            },
          ];
        } else {
          (draft.tokenBalancesHistorical ?? [])[index].status = 'LOADING';
        }
      });
    case 'LOAD_TOKENS_BALANCE_HISTORICAL_SUCCESS':
      return produce(state, (draft) => {
        draft.tokenBalancesHistorical = (
          state.tokenBalancesHistorical ?? []
        ).map((tokenBalanceHistorical) => {
          if (
            tokenBalanceHistorical.tokenId === action.payload.tokenId &&
            tokenBalanceHistorical.level === action.payload.level
          ) {
            return {
              ...tokenBalanceHistorical,
              balanceHistorical: action.payload.balanceHistorical,
              status: 'SUCCESS',
            };
          }

          return tokenBalanceHistorical;
        });
      });
    case 'LOAD_TOKENS_BALANCE_HISTORICAL_FAILURE':
      return produce(state, (draft) => {
        draft.tokenBalancesHistorical = (
          state.tokenBalancesHistorical ?? []
        ).map((tokenBalanceHistorical) => {
          if (
            tokenBalanceHistorical.tokenId === action.payload.tokenId &&
            tokenBalanceHistorical.level === action.payload.level
          ) {
            return {
              ...tokenBalanceHistorical,
              error: action.payload.error,
              status: 'ERROR',
            };
          }

          return tokenBalanceHistorical;
        });
      });

    default:
      return state;
  }
};

export const useWidgetStore = (): [
  ChainDataState,
  React.Dispatch<chainDataAction>
] => useReducer(chainDataReducer, initialChainDataState);
