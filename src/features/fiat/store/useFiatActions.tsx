import { CurrencyTicker } from '../../../config/config/currencies';
import { Token } from '../../../config/config/tokens';
import { Block, Level } from '../../chain/blocks/lib/blocks';
import { SpotPrice } from '../lib/fiat';

export type FiatAction =
  | {
      type: 'LOAD_SPOT_PRICE';
      payload: {
        currency: CurrencyTicker;
        latestBlock: Block;
        level: Level;
        token: Token;
      };
    }
  | {
      type: 'LOAD_SPOT_PRICE_SUCCESS';
      payload: { spotPrice: SpotPrice };
    }
  | {
      type: 'LOAD_SPOT_PRICE_ERROR';
      payload: {
        currency: CurrencyTicker;
        latestBlock: Block;
        level: Level;
        token: Token;
      };
    }
  | {
      type: 'SET_CURRENCY';
      payload: { currency: CurrencyTicker };
    };

export const loadSpotPrice = (
  token: Token,
  currency: CurrencyTicker,
  latestBlock: Block,
  level: Level
): FiatAction => ({
  type: 'LOAD_SPOT_PRICE',
  payload: {
    currency,
    latestBlock,
    level,
    token,
  },
});

export const loadSpotPriceSuccess = (spotPrice: SpotPrice): FiatAction => ({
  type: 'LOAD_SPOT_PRICE_SUCCESS',
  payload: { spotPrice },
});

export const loadSpotPriceError = (
  token: Token,
  currency: CurrencyTicker,
  latestBlock: Block,
  level: Level
): FiatAction => ({
  type: 'LOAD_SPOT_PRICE_ERROR',
  payload: { currency, latestBlock, level, token },
});

export const setCurrency = (currency: CurrencyTicker): FiatAction => ({
  type: 'SET_CURRENCY',
  payload: { currency },
});
