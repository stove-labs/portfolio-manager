import { useEffect } from 'react';
import { KnownToken } from '../../../../config/lib/helpers';
import { useLastKnown } from '../../../shared/hooks/useLastKnown';
import { useDispatchUniqueContext } from '../../../widgets/providers/DispatchUniqueProvider';
import { Level } from '../../blocks/lib/blocks';
import { WithStatus } from '../../blocks/store/useBlocksStore';
import { Balance } from '../lib/balances';
import { loadBalances } from '../store/useBalancesActions';
import { useSelectBalanceAtLevel } from '../store/useBalancesSelectors';

export interface UseBalanceAtLevelReturn {
  loading: boolean;
  balance?: WithStatus<Balance>;
}
export const useBalanceAtLevel = ({
  address,
  tokenId,
  level,
}: {
  address?: string;
  tokenId: KnownToken;
  level?: Level;
}): UseBalanceAtLevelReturn => {
  const { addToDispatchQueue: dispatch } = useDispatchUniqueContext();
  const { known: balance } = useLastKnown(
    useSelectBalanceAtLevel(tokenId, address, level),
    // TODO: make refetching on `level` change optional to avoid loading states
    // when the latest block is updated
    [tokenId, level]
  );

  useEffect(() => {
    const skip = !address || !level || !tokenId;
    if (skip) return;

    dispatch(loadBalances([level], address, [tokenId]));
  }, [tokenId, address, level]);

  return {
    loading: !balance?.status || balance?.status === 'LOADING',
    balance,
  };
};
