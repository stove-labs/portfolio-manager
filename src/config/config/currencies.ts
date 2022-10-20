export type CurrencySymbol = 'USD' | 'EUR';
export interface Currency {
  symbol: CurrencySymbol;
  position: 'left' | 'right';
  ticker: 
}
export const currencies: Record<CurrencySymbol, Currency> = {
  USD: {
    symbol: 'USD',
    position: 'left',
  },
  EUR: {
    symbol: 'EUR',
    position: 'right',
  },
};

export const getAllCurrencies = (): Currency[] => {
  return Object.values(currencies);
};
