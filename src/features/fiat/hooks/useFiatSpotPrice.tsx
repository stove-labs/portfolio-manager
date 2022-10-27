import { useEffect, useMemo } from 'react';
import { getNativeToken } from '../../../config/lib/helpers';
import { useSelectLatestBlock } from '../../chain/blocks/store/useBlocksSelectors';
import { WithStatus } from '../../chain/blocks/store/useBlocksStore';
import { useLastKnown } from '../../shared/hooks/useLastKnown';
import { useDispatchUniqueContext } from '../../widgets/providers/DispatchUniqueProvider';
import { SpotPrice } from '../lib/fiat';
import {
  useSelectCurrency,
  useSelectFiatSpotPrice,
} from '../store/useFiatSelectors';

export interface UseFiatSpotPriceReturn {
  loading: boolean;
  spotPrice: WithStatus<SpotPrice> | undefined;
}
export const useFiatSpotPrice = (): UseFiatSpotPriceReturn => {
  const { addToDispatchQueue: dispatch } = useDispatchUniqueContext();
  // selectors
  const currency = useSelectCurrency();
  const latestBlock = useSelectLatestBlock()?.data;
  const level = useMemo(() => latestBlock?.level, [latestBlock]);
  const token = useMemo(() => getNativeToken(), []);

  const { known: spotPrice } = useLastKnown(
    useSelectFiatSpotPrice(token, level),
    currency
  );

  useEffect(() => {
    if (!latestBlock || !level) return;
    dispatch({
      type: 'LOAD_SPOT_PRICE',
      payload: {
        token,
        currency,
        latestBlock,
        level,
      },
    });
  }, [currency, latestBlock, level]);

  return {
    loading: !spotPrice?.status || spotPrice?.status === 'LOADING',
    spotPrice,
  };
};
