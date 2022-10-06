import React, { useMemo } from 'react';
import { Option, AutoComplete } from '../AutoComplete/AutoComplete';

export const TokenSelector: React.FC = () => {
  const options = useMemo<Option[]>(
    () => [
      {
        value: 'QUIPU',
        label: 'QUIPU',
      },
      {
        value: 'KUSD',
        label: 'kUSD',
      },
    ],
    []
  );

  return <AutoComplete label={'Token'} options={options} />;
};
