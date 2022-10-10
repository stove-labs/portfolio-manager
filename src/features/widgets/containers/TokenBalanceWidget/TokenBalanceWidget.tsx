import React, { useState } from 'react';
import {
  Balance,
  TokenBalanceWidget as TokenBalanceWidgetComponent,
  TokenBalanceWidgetSettingsData,
  WidgetProps,
} from './../../components/TokenBalanceWidget/TokenBalanceWidget';

export const TokenBalanceWidget: React.FC<
  WidgetProps<TokenBalanceWidgetSettingsData>
> = ({
  settings = {
    token: {
      ticker: 'kUSD',
      fullName: 'Kolibri USD',
    },
    historicalPeriod: '7d',
  },
  onWidgetRemove,
  onSettingsChange,
}) => {
  const [isLoading] = useState(false);

  const token = settings.token;

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
        settings={settings}
        onSettingsChange={onSettingsChange}
        onWidgetRemove={onWidgetRemove}
      />
    </>
  );
};
