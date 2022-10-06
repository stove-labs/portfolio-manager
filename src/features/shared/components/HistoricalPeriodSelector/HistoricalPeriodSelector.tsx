import React, { useMemo } from 'react';
import { AutoComplete } from '../AutoComplete/AutoComplete';

export const HistoricalPeriodSelector: React.FC = () => {
  const options = useMemo(
    () => [
      {
        value: '24h',
        label: '24h',
      },
      {
        value: '7d',
        label: '7d',
      },
      {
        value: '30d',
        label: '30d',
      },
    ],
    []
  );
  return <AutoComplete label={'Historical period'} options={options} />;
};
