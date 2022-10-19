import { Reducer, useReducer } from 'react';
import produce from 'immer';
import { HistoricalPeriod } from '../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';

export type Status = 'STANDBY' | 'LOADING' | 'SUCCESS' | 'ERROR';

export interface Block {
  timestamp?: string;
  level?: string;
  error?: string;
  status: Status;
}

export interface BlockHistorical {
  timestamp?: string;
  level?: string;
  error?: string;
  historicalPeriod?: HistoricalPeriod;
  status: Status;
}

// new blocks are always appended to the end of the array
export interface ChainState {
  currentBlock?: Block;
  blocks?: Block[];
  // Id is currentBlock level + historical period
  blocksHistorical?: Record<string, BlockHistorical>;
}

export type ChainAction =
  | { type: 'LOAD_LATEST_BLOCK' }
  | {
      type: 'LOAD_LATEST_BLOCK_SUCCESS';
      payload: { timestamp: string; level: string };
    }
  | { type: 'LOAD_LATEST_BLOCK_FAILURE'; payload: { error: string } }
  | {
      type: 'LOAD_BLOCK';
      payload: Record<
        string,
        { timestamp: string; historicalPeriod: HistoricalPeriod }
      >;
    }
  | {
      type: 'LOAD_BLOCK_SUCCESS';
      payload: Record<string, { timestamp: string; level: string }>;
    }
  | {
      type: 'LOAD_BLOCK_FAILURE';
      payload: Record<string, { error: string }>;
    };

export const initialChainState: ChainState = {};

export const chainReducer: Reducer<ChainState, ChainAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'LOAD_LATEST_BLOCK':
      return produce(state, (draft) => {
        draft.currentBlock = {
          status: 'LOADING',
        };
      });
    case 'LOAD_LATEST_BLOCK_SUCCESS':
      return produce(state, (draft) => {
        const block: Block = {
          level: action.payload.level,
          timestamp: action.payload.timestamp,
          status: 'SUCCESS',
        };
        draft.currentBlock = block;
        draft.blocks = [...(state.blocks ?? []), block];
      });
    case 'LOAD_LATEST_BLOCK_FAILURE':
      return produce(state, (draft) => {
        const block: Block = {
          error: action.payload.error,
          status: 'ERROR',
        };
        draft.currentBlock = block;
        draft.blocks = [...(state.blocks ?? []), block];
      });

    case 'LOAD_BLOCK':
      return produce(state, (draft) => {
        draft.blocksHistorical = state.blocksHistorical ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.blocksHistorical === undefined) return;

          draft.blocksHistorical[id] = {
            historicalPeriod: data.historicalPeriod,
            status: 'LOADING',
          };
        });
      });
    case 'LOAD_BLOCK_SUCCESS':
      return produce(state, (draft) => {
        draft.blocksHistorical = state.blocksHistorical ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.blocksHistorical === undefined) return;

          draft.blocksHistorical[id] = {
            ...data,
            status: 'SUCCESS',
          };
        });
      });
    case 'LOAD_BLOCK_FAILURE':
      return produce(state, (draft) => {
        draft.blocksHistorical = state.blocksHistorical ?? {};
        Object.entries(action.payload).forEach(([id, data]) => {
          if (draft.blocksHistorical === undefined) return;

          draft.blocksHistorical[id] = {
            ...data,
            status: 'ERROR',
          };
        });
      });

    default:
      return state;
  }
};

export const useChainStore = (): [ChainState, React.Dispatch<ChainAction>] =>
  useReducer(chainReducer, initialChainState);
