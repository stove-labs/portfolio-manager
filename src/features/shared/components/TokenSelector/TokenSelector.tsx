import React, { useCallback, useMemo } from 'react';
import { Token } from '../../../../config/config/tokens';
import { Option, AutoComplete } from '../AutoComplete/AutoComplete';

export interface TokenSelectorProps {
  tokens: Token[];
}

export const tokenToLabel = (token: Token): string => {
  return `${token.symbol} | ${token.name}`;
};

export const TokenSelector: React.FC<TokenSelectorProps> = ({ tokens }) => {
  const options = useMemo<Option[]>(
    () =>
      tokens.map((token) => ({
        value: token.id,
        label: tokenToLabel(token),
      })),
    [tokens]
  );

  // transform token name to id
  const transformValueOut = useCallback((value: string) => {
    const transformedValue = tokens.find(
      (token) => tokenToLabel(token) === value
    )?.id;
    if (!transformedValue) throw new Error('Token not found');
    return transformedValue;
  }, []);

  // transform token name to id
  const transformValueIn = useCallback((value: string) => {
    const token = tokens.find((token) => token.id === value);
    const transformedValue = token && tokenToLabel(token);

    if (!transformedValue) throw new Error('Token not found');
    return transformedValue;
  }, []);

  return (
    <AutoComplete
      label={'Token'}
      name={'token'}
      options={options}
      transformValueIn={transformValueIn}
      transformValueOut={transformValueOut}
    />
  );
};
