import { useEffect, useMemo } from 'react';
import { KnownToken } from '../../../../config/lib/helpers';
import { useLastKnownArray } from '../../../shared/hooks/useLastKnown';
import { useDispatchUniqueContext } from '../../../widgets/providers/DispatchUniqueProvider';
import { Level } from '../../blocks/lib/blocks';
import { WithStatus } from '../../blocks/store/useBlocksStore';
import { Balance } from '../lib/balances';
import { loadBalances } from '../store/useBalancesActions';
import { useSelectBalancesAtLevels } from '../store/useBalancesSelectors';

export interface UseBalancesAtLevelsReturn {
  loading: boolean;
  balances?: Array<WithStatus<Balance> | undefined> | undefined;
}
export const useBalancesAtLevels = ({
  address,
  tokenId,
  levels,
}: {
  address?: string;
  tokenId: KnownToken;
  levels?: Level[];
}): UseBalancesAtLevelsReturn => {
  const { addToDispatchQueue: dispatch } = useDispatchUniqueContext();
  const { known: balances } = useLastKnownArray(
    useSelectBalancesAtLevels(tokenId, address, levels),
    [tokenId, levels]
  );

  useEffect(() => {
    const skip = !address || !levels || !tokenId || !levels.length;
    if (skip) return;

    dispatch(loadBalances(levels, address, [tokenId]));
  }, [tokenId, address, levels]);

  const loading = useMemo(() => {
    const finished = balances?.filter((balance) => {
      return !balance?.status || balance?.status === 'LOADING';
    });
    if (!finished) return true;
    return finished?.length !== 0;
  }, [balances]);

  return {
    loading,
    balances,
  };
};
