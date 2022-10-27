import React, { useMemo } from 'react';
import { abbreviateNumber } from 'js-abbreviation-number';
import {
  Balance,
  MAX_DECIMALS,
  toDecimals,
} from '../../../chain/balances/lib/balances';
import { Token } from '../../../../config/config/tokens';

export interface FormattedBalanceProps {
  balance?: Balance;
  token?: Token;
}

export const FormattedBalance: React.FC<FormattedBalanceProps> = ({
  balance,
  token,
}) => {
  const emDash: string = '—';
  const formattedBalance: string = useMemo((): string => {
    if (balance?.amount === undefined || token?.id === undefined) return emDash;
    if (Number(balance?.amount) === 0) return '0';
    if (Number(balance?.amount) === 0.000001) return '>0.000001';
    if (Number(balance.amount) > 1)
      return abbreviateNumber(
        Number(toDecimals(balance, token?.id)),
        MAX_DECIMALS
      );

    return toDecimals(balance, token?.id);
  }, [balance?.amount]);

  return <>{formattedBalance}</>;
};
