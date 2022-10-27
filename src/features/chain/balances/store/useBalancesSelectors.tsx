import { useMemo } from 'react';
import { KnownToken } from '../../../../config/lib/helpers';
import { useStoreContext } from '../../../../store/useStore';
import { useSelectActiveAccountAddress } from '../../../Wallet/store/useWalletSelectors';
import { Level } from '../../blocks/lib/blocks';
import { WithStatus } from '../../blocks/store/useBlocksStore';
import { Balance, getBalanceId } from '../lib/balances';
import { BalancesState } from './useBalancesStore';

export const useSelectBalances = (): BalancesState => {
  const [state] = useStoreContext();
  return useMemo(() => state.balances, [state]);
};

export const useSelectBalanceAtLevel = (
  tokenId: KnownToken,
  address?: string,
  level?: Level
): WithStatus<Balance> | undefined => {
  const balances = useSelectBalances();

  return useMemo(() => {
    if (!level || !address) return;
    const id = getBalanceId(level, address, tokenId);
    return balances.balances[id];
  }, [address, level, tokenId, balances]);
};

export const useSelectActiveAccountBalanceAtLevel = (
  tokenId: KnownToken,
  level?: Level
): WithStatus<Balance> | undefined => {
  const address = useSelectActiveAccountAddress();
  return useSelectBalanceAtLevel(tokenId, address, level);
};
