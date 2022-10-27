import { Token } from '../../../../config/config/tokens';
import { useLastKnown } from '../../../shared/hooks/useLastKnown';
import { useSelectLatestBlock } from '../../blocks/store/useBlocksSelectors';
import {
  useSpotPriceFromTokenAtLevel,
  UseSpotPriceFromTokenReturn,
} from './useSpotPriceFromTokenAtLevel';

export type UseSpotPriceToTokenLatest = UseSpotPriceFromTokenReturn;
export const useSpotPriceFromTokenLatest = (
  token: Token
): UseSpotPriceToTokenLatest => {
  const { known: latestBlock } = useLastKnown(useSelectLatestBlock());
  return useSpotPriceFromTokenAtLevel(token, latestBlock?.data?.level);
};
