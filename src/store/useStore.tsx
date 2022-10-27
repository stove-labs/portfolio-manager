import constate from 'constate';
import React, { Reducer, useCallback, useReducer } from 'react';
import combineReducers from 'react-combine-reducers';
import logger from 'use-reducer-logger';
import {
  WidgetsLayoutAction,
  widgetsLayoutReducer,
  WidgetsLayoutState,
  initialWidgetsLayoutState,
} from '../features/widgets/containers/WidgetsLayout/store/useWidgetsLayoutStore';
import { useWalletEffects } from '../features/Wallet/store/useWalletEffects';
import {
  initialWalletState,
  WalletAction,
  walletReducer,
  WalletState,
} from '../features/Wallet/store/useWalletStore';
import {
  blocksReducer,
  BlocksState,
  initialBlocksState,
} from '../features/chain/blocks/store/useBlocksStore';
import { useBlocksEffects } from '../features/chain/blocks/store/useBlocksEffects';
import {
  balancesReducer,
  BalancesState,
  initialBalancesState,
} from '../features/chain/balances/store/useBalancesStore';
import { useBalancesEffects } from '../features/chain/balances/store/useBalancesEffects';
import { BlocksAction } from '../features/chain/blocks/store/useBlocksActions';
import { BalancesAction } from '../features/chain/balances/store/useBalancesActions';
import {
  fiatReducer,
  FiatState,
  initialFiatState,
} from '../features/fiat/store/useFiatStore';
import { FiatAction } from '../features/fiat/store/useFiatActions';
import { useFiatEffects } from '../features/fiat/store/useFiatEffects';

export interface State {
  wallet: WalletState;
  settings: WidgetsLayoutState;
  blocks: BlocksState;
  balances: BalancesState;
  fiat: FiatState;
}

export type Action =
  | WalletAction
  | WidgetsLayoutAction
  | BlocksAction
  | BalancesAction
  | FiatAction;

export type AppReducer = Reducer<State, Action>;

const [reducer, initialState] = combineReducers<AppReducer>({
  wallet: [walletReducer, initialWalletState],
  // TODO: rename either layout -> settings, or settings -> layout
  settings: [widgetsLayoutReducer, initialWidgetsLayoutState],
  blocks: [blocksReducer, initialBlocksState],
  balances: [balancesReducer, initialBalancesState],
  fiat: [fiatReducer, initialFiatState],
});

export type Effect = (
  state: State,
  action: Action,
  dispatch: React.Dispatch<Action>
) => void;
export type EffectHook = () => Effect;
export type RunEffects = Effect;
export const useCombineEffects = (effects: EffectHook[]): RunEffects => {
  const combinedEffects = effects.reduce((effects: Effect[], useEffect) => {
    effects.push(useEffect());
    return effects;
  }, []);

  return useCallback(
    (state: State, action: Action, dispatch: React.Dispatch<Action>) => {
      combinedEffects.forEach((effect) => {
        effect(state, action, dispatch);
      });
    },
    [combinedEffects]
  );
};

export const useStore = (): [State, React.Dispatch<Action>] => {
  const [state, dispatch] = useReducer(logger(reducer), initialState);
  const runEffects = useCombineEffects([
    useWalletEffects,
    useBlocksEffects,
    useBalancesEffects,
    useFiatEffects,
  ]);
  const dispatchWithEffects: React.Dispatch<Action> = useCallback(
    (action) => {
      dispatch(action);
      runEffects(state, action, dispatchWithEffects);
    },
    [dispatch, runEffects]
  );

  return [state, dispatchWithEffects];
};

export const [StoreProvider, useStoreContext] = constate(useStore);
