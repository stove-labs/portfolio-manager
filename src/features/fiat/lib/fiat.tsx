import { CurrencyTicker } from '../../../config/config/currencies';
import { Token } from '../../../config/config/tokens';
import { getNativeToken } from '../../../config/lib/helpers';
import { Block, ID, Level } from '../../chain/blocks/lib/blocks';
import { levelToDateString } from '../../chain/blocks/store/useBlocksSelectors';

export interface SpotPrice {
  // tokenId-currency-level
  id: ID;
  level: string;
  currency: CurrencyTicker;
  price: string;
}

export const COINBASE_PRICES_URL = 'https://api.coinbase.com/v2/prices';
export const getSpotPriceURL = (
  symbol: string,
  currency: string,
  date: string
): string => `${COINBASE_PRICES_URL}/${symbol}-${currency}/spot?date=${date}`;

export interface GetSpotPriceAtDateResponse {
  data: {
    amount: string;
  };
}

export const getSpotPriceId = (
  token: Token,
  currency: CurrencyTicker,
  level: Level
): string => `${token.id}-${currency}-${level}`;

export const getSpotPriceAtLevel = async (
  token: Token,
  currency: CurrencyTicker,
  latestBlock: Block,
  level: Level
): Promise<SpotPrice> => {
  const dateAtLevel = levelToDateString(latestBlock, level);
  const url = getSpotPriceURL(token.symbol, currency, dateAtLevel);
  const response = await fetch(url);
  if (!response.ok) throw new Error(await response.text());

  const body = await (response.json() as Promise<GetSpotPriceAtDateResponse>);
  const price = body.data.amount;

  const id = getSpotPriceId(token, currency, level);
  const spotPrice: SpotPrice = {
    id,
    level,
    currency,
    price,
  };
  return spotPrice;
};

export const getNativeTokenSpotPriceAtLevel = async (
  currency: CurrencyTicker,
  latestBlock: Block,
  level: Level
): Promise<SpotPrice> => {
  const nativeToken = getNativeToken();
  return await getSpotPriceAtLevel(nativeToken, currency, latestBlock, level);
};
