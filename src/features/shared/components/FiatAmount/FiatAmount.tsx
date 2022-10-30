import BigNumber from 'bignumber.js';
import React, { useMemo } from 'react';
import { abbreviateNumber } from 'js-abbreviation-number';

import {
  currencies,
  CurrencyTicker,
} from '../../../../config/config/currencies';

export interface FiatAmountProps {
  amount?: string;
  currencyTicker?: CurrencyTicker;
}

export const FiatAmount: React.FC<FiatAmountProps> = ({
  currencyTicker,
  amount,
}) => {
  const emDash: string = '—';
  const currency = useMemo(
    () => currencyTicker && currencies[currencyTicker],
    [currencyTicker]
  );
  const formattedFiatBalance: string = useMemo((): string => {
    if (amount === undefined) return emDash;
    if (Number(amount) === 0) return '0';
    if (Number(amount) === 0.01) return '>0.01';
    if (Number(amount) > 1)
      return abbreviateNumber(Number(new BigNumber(amount).toFixed(2)), 2);

    return Number(amount).toFixed(2);
  }, [amount]);

  return (
    <>
      {currency?.position === 'left' && currency?.symbol}
      {formattedFiatBalance}
      {currency?.position === 'right' && currency?.symbol}
    </>
  );
};
