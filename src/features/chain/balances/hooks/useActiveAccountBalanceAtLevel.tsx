import { useEffect } from 'react';
import { KnownToken } from '../../../../config/lib/helpers';
import { useStoreContext } from '../../../../store/useStore';
import { useLastKnown } from '../../../shared/hooks/useLastKnown';
import { useSelectActiveAccountAddress } from '../../../wallet/store/useWalletSelectors';
import { Level } from '../../blocks/lib/blocks';
import {} from '../../blocks/store/useBlocksSelectors';
import { WithStatus } from '../../blocks/store/useBlocksStore';
import { Balance } from '../lib/balances';
import { loadBalances } from '../store/useBalancesActions';
import { useSelectActiveAccountBalanceAtLevel } from '../store/useBalancesSelectors';

export interface UseActiveAccountBalanceAtLevelReturn {
  loading: boolean;
  balance?: WithStatus<Balance>;
}
export const useActiveAccountBalanceAtLevel = ({
  tokenId,
  level,
}: {
  tokenId: KnownToken;
  level?: Level;
}): UseActiveAccountBalanceAtLevelReturn => {
  const [, dispatch] = useStoreContext();
  const address = useSelectActiveAccountAddress();
  const { known: balance } = useLastKnown(
    useSelectActiveAccountBalanceAtLevel(tokenId, level),
    tokenId
  );

  useEffect(() => {
    const skip = !address || !level;
    if (skip) return;

    dispatch(loadBalances([level], address, [tokenId]));
  }, [tokenId, address, level]);

  return {
    loading: !balance?.status || balance?.status === 'LOADING',
    balance,
  };
};
