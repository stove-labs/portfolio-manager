import React, { useMemo } from 'react';
import {
  currencies,
  CurrencyTicker,
} from '../../../../config/config/currencies';

export interface FiatAmountProps {
  amount?: string;
  currencyTicker: CurrencyTicker;
}

export const FiatAmount: React.FC<FiatAmountProps> = ({
  currencyTicker,
  amount,
}) => {
  const emDash: string = '—';
  const currency = useMemo(() => currencies[currencyTicker], [currencyTicker]);

  return (
    <>
      {currency.position === 'left' && currency.symbol}
      {amount ?? emDash}
      {currency.position === 'right' && currency.symbol}
    </>
  );
};
