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

  return (
    <>
      {currency?.position === 'left' && currency?.symbol}
      {(amount && abbreviateNumber(Number(new BigNumber(amount).toFixed(2)))) ??
        emDash}
      {currency?.position === 'right' && currency?.symbol}
    </>
  );
};
