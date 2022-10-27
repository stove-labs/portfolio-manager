import { KnownToken } from '../../../../config/lib/helpers';
import { useSelectRelativeHistoricalLevelHoursAgo } from '../../blocks/store/useBlocksSelectors';
import {
  useActiveAccountBalanceAtLevel,
  UseActiveAccountBalanceAtLevelReturn,
} from './useActiveAccountBalanceAtLevel';

export type UseActiveAccountBalanceHistoricalReturn =
  UseActiveAccountBalanceAtLevelReturn;
export const useActiveAccountBalanceHistorical = ({
  tokenId,
  hoursAgo,
}: {
  tokenId: KnownToken;
  hoursAgo: string;
}): UseActiveAccountBalanceHistoricalReturn => {
  const level = useSelectRelativeHistoricalLevelHoursAgo(hoursAgo);
  return useActiveAccountBalanceAtLevel({ tokenId, level });
};
