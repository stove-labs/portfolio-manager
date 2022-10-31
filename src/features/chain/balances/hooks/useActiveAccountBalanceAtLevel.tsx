import { KnownToken } from '../../../../config/lib/helpers';
import { useSelectActiveAccountAddress } from '../../../wallet/store/useWalletSelectors';
import { Level } from '../../blocks/lib/blocks';
import { WithStatus } from '../../blocks/store/useBlocksStore';
import { Balance } from '../lib/balances';
import { useBalanceAtLevel } from './useBalanceAtLevel';

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
  const address = useSelectActiveAccountAddress();
  return useBalanceAtLevel({ address, tokenId, level });
};
