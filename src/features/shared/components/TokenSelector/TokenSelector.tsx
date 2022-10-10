import React, { useMemo } from 'react';
import { Token } from '../../../widgets/components/TokenBalanceWidget/TokenBalanceWidget';
import { Option, AutoComplete } from '../AutoComplete/AutoComplete';

export interface TokenSelectorProps {
  tokens: Token[];
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({ tokens }) => {
  const options = useMemo<Option[]>(
    () =>
      tokens.map((token) => ({
        value: token.ticker,
        label: token.ticker,
      })),
    [tokens]
  );

  return <AutoComplete label={'Token'} name={'token'} options={options} />;
};
