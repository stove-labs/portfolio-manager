import constate from 'constate';
import React, { Reducer, useCallback, useReducer } from 'react';
import combineReducers from 'react-combine-reducers';
import logger from 'use-reducer-logger';
import { useCounterEffects } from '../features/Counter/store/useCounterEffects';
import {
  CounterAction,
  counterReducer,
  CounterState,
  initialCounterState,
} from '../features/Counter/store/useCounterStore';
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

export interface State {
  counter: CounterState;
  wallet: WalletState;
  settings: WidgetsLayoutState;
}

export type Action = CounterAction | WalletAction | WidgetsLayoutAction;

export type AppReducer = Reducer<State, Action>;

const [reducer, initialState] = combineReducers<AppReducer>({
  counter: [counterReducer, initialCounterState],
  wallet: [walletReducer, initialWalletState],
  settings: [widgetsLayoutReducer, initialWidgetsLayoutState],
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
  const runEffects = useCombineEffects([useCounterEffects, useWalletEffects]);
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
