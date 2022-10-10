import React, { useState } from 'react';
import {
  Balance,
  TokenBalanceWidget as TokenBalanceWidgetComponent,
} from './../../components/TokenBalanceWidget/TokenBalanceWidget';

export interface TokenBalanceWidgetProps {
  ticker?: string;
}

export const TokenBalanceWidget: React.FC<TokenBalanceWidgetProps> = ({
  ticker = 'XTZ',
}) => {
  const [isLoading] = useState(false);

  const token = {
    fullName: 'Kolibri USD',
    ticker: 'kUSD',
  };

  const balance: Balance = {
    amount: '0.005',
    token,
    fiatBalance: {
      amount: '100000',
    },
  };

  const historicalBalance: Balance = {
    amount: '50000',
    token,
    fiatBalance: {
      amount: '50000',
    },
  };

  return (
    <>
      <TokenBalanceWidgetComponent
        balance={balance}
        historicalBalance={historicalBalance}
        isLoading={isLoading}
      />
    </>
  );
};
