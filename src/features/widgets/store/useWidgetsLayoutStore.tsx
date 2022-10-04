import { Reducer, useReducer } from 'react';
import produce from 'immer';
import { Layout } from 'react-grid-layout';
import { find, isEmpty, without } from 'lodash';
import { Widgets } from '../components/WidgetsLayout/WidgetsLayout';

export interface WidgetsLayoutState {
  layout: Layout[];
  widgets: Widgets[];
}

export type WidgetsLayoutAction =
  | { type: 'SET_LAYOUT'; payload: { layout: Layout[]; widgets: Widgets[] } }
  | { type: 'UPDATE_LAYOUT'; payload: { layout: Layout[] } }
  | { type: 'ADD_WIDGET'; payload: { widget: Widgets } }
  | { type: 'REMOVE_WIDGET'; payload: { widget: Widgets } };

const data = JSON.parse(
  window.localStorage.getItem('STATE_LAYOUT') ?? '{}'
) as WidgetsLayoutState;

const token = {
  fullName: 'Kolibri USD',
  ticker: 'kUSD',
};

const settings = {
  balance: {
    amount: '100000',
    token,
    usdBalance: {
      amount: '100000',
    },
  },
  token,
  historicalBalance: {
    amount: '50000',
    token,
    usdBalance: {
      amount: '50000',
    },
  },
  isLoading: false,
};

export const defaultValues: WidgetsLayoutState = {
  layout: [
    {
      x: 0,
      y: 0,
      w: 4,
      h: 5,
      i: '0',
    },
    {
      x: 4,
      y: 0,
      w: 4,
      h: 5,
      i: '1',
    },
    {
      x: 8,
      y: 0,
      w: 4,
      h: 5,
      i: '2',
    },
  ],
  widgets: [
    {
      name: 'TokenBalanceWidget',
      settings,
    },
    {
      name: 'TokenBalanceWidget',
      settings,
    },
    {
      name: 'TokenBalanceWidget',
      settings,
    },
  ],
};

export const initialWidgetsLayoutState: WidgetsLayoutState =
  data && !isEmpty(data) ? data : defaultValues;

export const widgetsLayoutReducer: Reducer<
  WidgetsLayoutState,
  WidgetsLayoutAction
> = (state, action) => {
  switch (action.type) {
    case 'SET_LAYOUT':
      return produce(state, (draft) => {
        draft.layout = action.payload.layout;
        draft.widgets = action.payload.widgets;
      });

    case 'UPDATE_LAYOUT':
      return produce(state, (draft) => {
        draft.layout = action.payload.layout;
      });

    case 'ADD_WIDGET':
      return produce(state, (draft) => {
        draft.widgets = [...state.widgets, action.payload.widget];
      });

    case 'REMOVE_WIDGET':
      return produce(state, (draft) => {
        draft.widgets = without(
          state.widgets,
          find(state.widgets, action.payload.widget)
        ) as Widgets[];
      });

    default:
      return state;
  }
};

export const useWidgetsLayoutStore = (): [
  WidgetsLayoutState,
  React.Dispatch<WidgetsLayoutAction>
] => useReducer(widgetsLayoutReducer, initialWidgetsLayoutState);
