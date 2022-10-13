import produce from 'immer';
import { Reducer } from 'react';

export interface ActiveAccount {
  address: string;
}

export type WalletStatus = 'STANDBY' | 'LOADING' | 'SUCCESS' | 'ERROR';

export interface WalletState {
  activeAccount?: ActiveAccount;
  status: WalletStatus;
}

export type WalletAction =
  | { type: 'CHECK_ACTIVE_ACCOUNT' }
  | { type: 'CONNECT_ACTIVE_ACCOUNT' }
  | { type: 'SET_ACTIVE_ACCOUNT'; payload?: { activeAccount?: ActiveAccount } }
  | { type: 'DISCONNECT_ACTIVE_ACCOUNT' };

export const initialWalletState: WalletState = {
  status: 'STANDBY',
};

export const produceLoading = (state: WalletState): WalletState =>
  produce(state, (draft) => {
    draft.status = 'LOADING';
  });

export const walletReducer: Reducer<WalletState, WalletAction> = (
  state,
  action
) => {
  switch (action.type) {
    // TODO: add a helper to set status to loading for an array of action types
    case 'CHECK_ACTIVE_ACCOUNT':
      return produceLoading(state);

    case 'CONNECT_ACTIVE_ACCOUNT':
      return produceLoading(state);

    case 'DISCONNECT_ACTIVE_ACCOUNT':
      return produceLoading(state);

    case 'SET_ACTIVE_ACCOUNT':
      return produce(state, (draft) => {
        const activeAccount = action.payload?.activeAccount;
        draft.status = activeAccount ? 'SUCCESS' : 'STANDBY';
        draft.activeAccount = activeAccount;

        if (!activeAccount) delete draft.activeAccount;
      });
    default:
      return state;
  }
};
