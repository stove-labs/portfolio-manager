import { KnownToken } from '../../../../config/lib/helpers';
import { useSelectLatestBlockLevel } from '../../blocks/store/useBlocksSelectors';
import {
  useActiveAccountBalanceAtLevel,
  UseActiveAccountBalanceAtLevelReturn,
} from './useActiveAccountBalanceAtLevel';

export type UseActiveAccountBalanceLatestReturn =
  UseActiveAccountBalanceAtLevelReturn;
export const useActiveAccountBalanceLatest = ({
  tokenId,
}: {
  tokenId: KnownToken;
}): UseActiveAccountBalanceLatestReturn => {
  const level = useSelectLatestBlockLevel();
  return useActiveAccountBalanceAtLevel({ tokenId, level });
};
