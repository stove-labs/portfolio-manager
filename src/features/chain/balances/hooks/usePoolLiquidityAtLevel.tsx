import { useMemo } from 'react';
import { Token } from '../../../../config/config/tokens';
import { getNativeToken, isNativeToken } from '../../../../config/lib/helpers';
import { Level } from '../../blocks/lib/blocks';
import { WithStatus } from '../../blocks/store/useBlocksStore';
import { Balance } from '../lib/balances';
import { useBalanceAtLevel } from './useBalanceAtLevel';

export interface UsePoolLiquidityAtLevelReturn {
  liquidity?: {
    native?: WithStatus<Balance>;
    token?: WithStatus<Balance>;
  };
  loading: boolean;
}
export const usePoolLiquidityAtLevel = (
  token: Token,
  level?: Level
): UsePoolLiquidityAtLevelReturn => {
  const poolAddress = token.pool?.address;
  const nativeToken = getNativeToken();
  const { balance: liquidityNative } = useBalanceAtLevel({
    address: poolAddress,
    level,
    tokenId: useMemo(() => nativeToken.id, []),
  });

  const { balance: liquidityToken } = useBalanceAtLevel({
    address: poolAddress,
    level,
    tokenId: token.id,
  });

  return {
    loading: isNativeToken(token)
      ? false
      : !liquidityNative?.status ||
        liquidityNative.status === 'LOADING' ||
        !liquidityToken?.status ||
        liquidityToken.status === 'LOADING',
    liquidity: isNativeToken(token)
      ? undefined
      : {
          native: liquidityNative,
          token: liquidityToken,
        },
  };
};
