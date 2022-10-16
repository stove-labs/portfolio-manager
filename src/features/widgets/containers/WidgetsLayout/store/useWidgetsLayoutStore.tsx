import { Reducer, useReducer } from 'react';
import produce from 'immer';
import { Layout } from 'react-grid-layout';
import { isEmpty } from 'lodash';
import {
  WidgetSettings,
  WidgetSettingsData,
} from '../../../components/WidgetsLayout/WidgetsLayout';

export interface WidgetsLayoutState {
  layout: Layout[];
  widgets: WidgetSettings[];
}

export type WidgetsLayoutAction =
  | {
      type: 'SET_LAYOUT';
      payload: { layout: Layout[]; widgets: WidgetSettings[] };
    }
  | { type: 'UPDATE_LAYOUT'; payload: { layout: Layout[] } }
  | {
      type: 'ADD_WIDGET';
      payload: { layout: Layout[]; widget: WidgetSettings };
    }
  | {
      type: 'REMOVE_WIDGET';
      payload: { id: string };
    }
  | {
      type: 'UPDATE_WIDGET';
      payload: { id: string; settings: WidgetSettingsData };
    };

const data = JSON.parse(
  window.localStorage.getItem('STATE_LAYOUT') ?? '{}'
) as WidgetsLayoutState;

export const defaultValues: WidgetsLayoutState = {
  layout: [
    {
      x: 0,
      y: 0,
      w: 4,
      h: 3,
      i: '0',
    },
  ],
  widgets: [
    {
      name: 'TokenBalanceWidget',
      id: '0',
      settings: {
        token: '0',
        historicalPeriod: '7d',
      },
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
        draft.layout = action.payload.layout;
        draft.widgets = [...state.widgets, action.payload.widget];
      });

    case 'REMOVE_WIDGET':
      return produce(state, (draft) => {
        draft.layout = state.layout.filter(
          (item) => item.i !== action.payload.id
        );
        draft.widgets = state.widgets.filter(
          (item) => item.id !== action.payload.id
        );
      });

    case 'UPDATE_WIDGET':
      return produce(state, (draft) => {
        draft.widgets = draft.widgets.map((widget) => {
          if (widget.id === action.payload.id) {
            widget.settings = action.payload.settings;
          }

          return widget;
        });
      });

    default:
      return state;
  }
};

export const useWidgetsLayoutStore = (): [
  WidgetsLayoutState,
  React.Dispatch<WidgetsLayoutAction>
] => useReducer(widgetsLayoutReducer, initialWidgetsLayoutState);
