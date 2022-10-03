import { Reducer, useReducer } from 'react';
import produce from 'immer';

export interface CounterState {
  count: number;
}

export type CounterAction =
  | { type: 'INCREMENT_BY'; payload: { amount: number } }
  | { type: 'INCREMENT_BY_ASYNC'; payload: { amount: number } }
  | { type: 'DECREMENT' };

export const initialCounterState: CounterState = {
  count: 0,
};

export const counterReducer: Reducer<CounterState, CounterAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'DECREMENT':
      return produce(state, (draft) => {
        draft.count--;
      });

    case 'INCREMENT_BY':
      return produce(state, (draft) => {
        draft.count += action.payload.amount;
      });

    default:
      return state;
  }
};

export const useCounterStore = (): [
  CounterState,
  React.Dispatch<CounterAction>
] => useReducer(counterReducer, initialCounterState);
