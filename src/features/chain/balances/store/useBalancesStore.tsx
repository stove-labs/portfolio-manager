import produce from 'immer';
import { Reducer } from 'react';
import { evictEntities } from '../../../../store/providers/StoreEvictProvider';
import { ID } from '../../blocks/lib/blocks';
import { WithStatus } from '../../blocks/store/useBlocksStore';
import { Balance, getBalanceId } from '../lib/balances';
import { BalancesAction } from './useBalancesActions';

export interface BalancesState {
  balances: Record<ID, WithStatus<Balance>>;
}

export const initialBalancesState: BalancesState = {
  balances: {},
};

export const balancesReducer: Reducer<BalancesState, BalancesAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'LOAD_BALANCES': {
      const { levels, address, tokenIds } = action.payload;
      return produce(state, (draft) => {
        tokenIds.forEach((tokenId) => {
          levels.forEach((level) => {
            const id = getBalanceId(level, address, tokenId);
            draft.balances[id] = {
              ...draft.balances[id],
              status: 'LOADING',
            };
          });
        });
      });
    }
    case 'LOAD_BALANCES_SUCCESS': {
      const { balances } = action.payload;
      return produce(state, (draft) => {
        balances.forEach((balance) => {
          const { id } = balance;
          draft.balances[id] = {
            status: 'SUCCESS',
            data: balance,
          };
        });
      });
    }

    case 'EVICT': {
      return produce(state, (draft) => {
        const entities = draft.balances;
        draft.balances = evictEntities(entities, action.payload.keepIDs);
      });
    }

    default:
      return state;
  }
};
