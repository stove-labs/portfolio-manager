import { useMemo } from 'react';
import { CurrencyTicker } from '../../../config/config/currencies';
import { Token } from '../../../config/config/tokens';
import { useStoreContext } from '../../../store/useStore';
import { Level } from '../../chain/blocks/lib/blocks';
import { WithStatus } from '../../chain/blocks/store/useBlocksStore';
import { getSpotPriceId, SpotPrice } from '../lib/fiat';
import { FiatState } from './useFiatStore';

export const useSelectFiat = (): FiatState => {
  const [state] = useStoreContext();
  return useMemo(() => state.fiat, [state]);
};

export const useSelectCurrency = (): CurrencyTicker => {
  const fiat = useSelectFiat();
  return useMemo(() => fiat.currency, [fiat]);
};

export const useSelectFiatSpotPrice = (
  token: Token,
  level?: Level
): WithStatus<SpotPrice> | undefined => {
  const currency = useSelectCurrency();
  const fiat = useSelectFiat();

  return useMemo(() => {
    if (!level) return;
    const id = getSpotPriceId(token, currency, level);
    return fiat.spotPrices[id];
  }, [fiat]);
};
