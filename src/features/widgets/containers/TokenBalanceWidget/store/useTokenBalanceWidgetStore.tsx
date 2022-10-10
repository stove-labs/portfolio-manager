import { Reducer, useReducer } from 'react';
import produce from 'immer';

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
  id: string;
  balance: string;
}

export interface TokenBalanceHistorical {
  id: string;
  balanceHistorical: string;
}

export interface TokenBalanceWidgetState {
  tokens: {
    data?: Token[];
    isLoading: boolean;
    error?: string;
  };
  tokensBalance: {
    data?: TokenBalance[];
    isLoading: boolean;
    error?: string;
  };
  tokensBalanceHistorical: {
    data?: TokenBalanceHistorical[];
    isLoading: boolean;
    error?: string;
  };
}

export type TokenBalanceWidgetAction =
  | { type: 'LOAD_TOKENS' }
  | { type: 'LOAD_TOKENS_SUCCESS'; payload: { data: Token[] } }
  | { type: 'LOAD_TOKENS_FAILURE'; payload: { error: string } }
  | { type: 'LOAD_TOKENS_BALANCE' }
  | { type: 'LOAD_TOKENS_BALANCE_SUCCESS'; payload: { data: TokenBalance[] } }
  | { type: 'LOAD_TOKENS_BALANCE_FAILURE'; payload: { error: string } }
  | { type: 'LOAD_TOKENS_BALANCE_HISTORICAL' }
  | {
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL_SUCCESS';
      payload: { data: TokenBalanceHistorical[] };
    }
  | {
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL_FAILURE';
      payload: { error: string };
    };

const Tezos: Token = {
  id: '0',
  metadata: {
    name: 'Tezos',
    symbol: 'XTZ',
    decimals: '6',
  },
};

const defaultValues: TokenBalanceWidgetState = {
  tokens: {
    data: [Tezos],
    isLoading: false,
  },
  tokensBalance: {
    data: [
      {
        id: '0',
        balance: '0',
      },
    ],
    isLoading: false,
  },
  tokensBalanceHistorical: {
    data: [
      {
        id: '0',
        balanceHistorical: '0',
      },
    ],
    isLoading: false,
  },
};

export const initialTokenBalanceWidgetState: TokenBalanceWidgetState =
  defaultValues;

export const tokenBalanceWidgetReducer: Reducer<
  TokenBalanceWidgetState,
  TokenBalanceWidgetAction
> = (state, action) => {
  switch (action.type) {
    case 'LOAD_TOKENS':
      return produce(state, (draft) => {
        draft.tokens.isLoading = true;
      });
    case 'LOAD_TOKENS_SUCCESS':
      return produce(state, (draft) => {
        draft.tokens.isLoading = false;
        draft.tokens.data = [
          ...(state.tokens.data ?? []),
          ...action.payload.data,
        ];
      });
    case 'LOAD_TOKENS_FAILURE':
      return produce(state, (draft) => {
        draft.tokens.isLoading = false;
        draft.tokens.error = action.payload.error;
      });

    case 'LOAD_TOKENS_BALANCE':
      return produce(state, (draft) => {
        draft.tokensBalance.isLoading = true;
      });
    case 'LOAD_TOKENS_BALANCE_SUCCESS':
      return produce(state, (draft) => {
        draft.tokensBalance.isLoading = false;
        draft.tokensBalance.data = [
          ...(state.tokensBalance.data ?? []),
          ...action.payload.data,
        ];
      });
    case 'LOAD_TOKENS_BALANCE_FAILURE':
      return produce(state, (draft) => {
        draft.tokensBalance.isLoading = false;
        draft.tokensBalance.error = action.payload.error;
      });

    case 'LOAD_TOKENS_BALANCE_HISTORICAL':
      return produce(state, (draft) => {
        draft.tokensBalanceHistorical.isLoading = true;
      });
    case 'LOAD_TOKENS_BALANCE_HISTORICAL_SUCCESS':
      return produce(state, (draft) => {
        draft.tokensBalanceHistorical.isLoading = false;
        draft.tokensBalanceHistorical.data = [
          ...(state.tokensBalanceHistorical.data ?? []),
          ...action.payload.data,
        ];
      });
    case 'LOAD_TOKENS_BALANCE_HISTORICAL_FAILURE':
      return produce(state, (draft) => {
        draft.tokensBalanceHistorical.isLoading = false;
        draft.tokensBalanceHistorical.error = action.payload.error;
      });

    default:
      return state;
  }
};

export const useTokenBalanceWidgetStore = (): [
  TokenBalanceWidgetState,
  React.Dispatch<TokenBalanceWidgetAction>
] => useReducer(tokenBalanceWidgetReducer, initialTokenBalanceWidgetState);
