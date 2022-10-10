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
    token: 'QUIPU',
    historicalPeriod: '7d',
  },
  onWidgetRemove,
  onSettingsChange,
}) => {
  const [isLoading] = useState(false);

  const balance: Balance = {
    amount: '0.005',
    token: {
      id: '0',
      ticker: settings.token,
      fullName: 'Kolibri',
    },
    fiatBalance: {
      amount: '100000',
    },
  };

  const historicalBalance: Balance = {
    amount: '50000',
    token: {
      id: '0',
      ticker: 'kUSD',
      fullName: 'Kolibri',
    },
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
