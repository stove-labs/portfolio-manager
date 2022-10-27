import { KnownToken } from '../../../../config/lib/helpers';
import { Level } from '../../blocks/lib/blocks';
import { EvictAction } from '../../blocks/store/useBlocksActions';
import { Balance } from '../lib/balances';

export type BalancesAction =
  | {
      type: 'LOAD_BALANCES';
      payload: {
        levels: Level[];
        address: string;
        tokenIds: KnownToken[];
      };
    }
  | {
      type: 'LOAD_BALANCES_SUCCESS';
      payload: {
        balances: Balance[];
      };
    }
  | {
      type: 'LOAD_BALANCES_ERROR';
      payload: {
        levels: Level[];
        address: string;
        tokenIds: KnownToken[];
      };
    }
  | EvictAction;

// export type LoadActiveAccountBalance =
export const loadBalances = (
  levels: Level[],
  address: string,
  tokenIds: KnownToken[]
): BalancesAction => ({
  type: 'LOAD_BALANCES',
  payload: {
    levels,
    address,
    tokenIds,
  },
});

export const loadBalancesSuccess = (balances: Balance[]): BalancesAction => ({
  type: 'LOAD_BALANCES_SUCCESS',
  payload: { balances },
});

export const loadBalancesError = (
  levels: Level[],
  address: string,
  tokenIds: KnownToken[]
): BalancesAction => ({
  type: 'LOAD_BALANCES_ERROR',
  payload: { levels, address, tokenIds },
});
