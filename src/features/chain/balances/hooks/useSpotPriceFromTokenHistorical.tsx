import { Token } from '../../../../config/config/tokens';
import { useSelectRelativeHistoricalLevelHoursAgo } from '../../blocks/store/useBlocksSelectors';
import {
  useSpotPriceFromTokenAtLevel,
  UseSpotPriceFromTokenReturn,
} from './useSpotPriceFromTokenAtLevel';

export type UseSpotPriceToTokenHistorical = UseSpotPriceFromTokenReturn;
export const useSpotPriceFromTokenHistorical = (
  token: Token,
  hoursAgo: string
): UseSpotPriceToTokenHistorical => {
  const level = useSelectRelativeHistoricalLevelHoursAgo(hoursAgo);
  return useSpotPriceFromTokenAtLevel(token, level);
};
