import React, { useMemo } from 'react';
import { Token } from '../../../widgets/store/useChainDataStore';
import { Option, AutoComplete } from '../AutoComplete/AutoComplete';

export interface TokenSelectorProps {
  tokens: Token[];
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({ tokens }) => {
  const options = useMemo<Option[]>(
    () =>
      tokens.map((token) => ({
        value: token.id,
        label: `${token.symbol} | ${token.name}`,
      })),
    [tokens]
  );

  return <AutoComplete label={'Token'} name={'token'} options={options} />;
};
