import React, { useEffect, useMemo } from 'react';
import { TokenBalanceWidget } from '../../components/TokenBalanceWidget/TokenBalanceWidget';
import { useDispatchUniqueContext } from '../../providers/DispatchUniqueProvider';

export const WidgetRenderer: React.FC = () => {
  const { flushDispatchQueue } = useDispatchUniqueContext();
  const token = {
    fullName: 'Kolibri USD',
    ticker: 'kUSD',
  };
  const widgets = useMemo(() => {
    const data = {
      balance: {
        amount: '100000',
        token,
        usdBalance: {
          amount: '100000',
        },
      },
      token,
      historicalBalance: {
        amount: '50000',
        token,
        usdBalance: {
          amount: '50000',
        },
      },
      isLoading: false,
    };

    const widgets = [
      <TokenBalanceWidget key={0} {...data} />,
      <TokenBalanceWidget key={1} {...data} />,
      <TokenBalanceWidget key={2} {...data} />,
      <TokenBalanceWidget key={3} {...data} />,
    ];

    return widgets;
  }, []);

  useEffect(() => {
    flushDispatchQueue();
  }, []);

  return <>{widgets}</>;
};
