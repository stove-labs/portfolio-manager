import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { Token } from '../../../../config/config/tokens';
import { getNativeToken, isNativeToken } from '../../../../config/lib/helpers';
import { getSpotPriceId, SpotPrice } from '../../../fiat/lib/fiat';
import { useSelectCurrency } from '../../../fiat/store/useFiatSelectors';
import { Level } from '../../blocks/lib/blocks';
import { toDecimals } from '../lib/balances';
import { usePoolLiquidityAtLevel } from './usePoolLiquidityAtLevel';

export interface UseSpotPriceFromTokenReturn {
  loading: boolean;
  spotPrice?: SpotPrice;
}

// TODO: clear known when level changes
export const useSpotPriceFromTokenAtLevel = (
  token: Token,
  level?: Level
): UseSpotPriceFromTokenReturn => {
  const { loading, liquidity } = usePoolLiquidityAtLevel(token, level);
  const currency = useSelectCurrency();
  const nativeTokenId = getNativeToken().id;

  const spotPrice = useMemo<SpotPrice | undefined>(() => {
    let price: string | undefined;

    if (isNativeToken(token)) {
      price = '1';
    }

    if (
      liquidity?.native?.data?.amount &&
      liquidity?.token?.data?.amount &&
      level
    ) {
      price = isNativeToken(token)
        ? '1'
        : new BigNumber(toDecimals(liquidity.native.data, nativeTokenId))
            .dividedBy(toDecimals(liquidity.token.data, token.id))
            .toFixed(6);
    }

    if (price === undefined || !level) return;

    const id = getSpotPriceId(token, currency, level);

    return {
      id,
      price,
      level,
      currency,
    };
  }, [liquidity, currency, token, level]);

  return { loading: isNativeToken(token) ? false : loading, spotPrice };
};
