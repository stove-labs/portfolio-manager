export type CurrencyTicker = 'USD' | 'EUR';
export interface Currency {
  symbol: string;
  position: 'left' | 'right';
  ticker: CurrencyTicker;
}
export const currencies: Record<CurrencyTicker, Currency> = {
  USD: {
    ticker: 'USD',
    position: 'left',
    symbol: '$',
  },
  EUR: {
    ticker: 'EUR',
    position: 'right',
    symbol: '€',
  },
};

export const getAllCurrencies = (): Currency[] => {
  return Object.values(currencies);
};
