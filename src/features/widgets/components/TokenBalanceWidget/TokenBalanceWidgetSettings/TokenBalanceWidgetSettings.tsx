import React from 'react';
import { Flex } from '@chakra-ui/react';
import { HistoricalPeriodSelector } from '../../../../shared/components/HistoricalPeriodSelector/HistoricalPeriodSelector';
import { TokenSelector } from '../../../../shared/components/TokenSelector/TokenSelector';
import { Token } from '../TokenBalanceWidget';

export type HistoricalPeriod = '24h' | '7d' | '30d';

export interface TokenBalanceWidgetSettingsData {
  token: Token;
  historicalPeriod: HistoricalPeriod;
}

export interface TokenBalanceWidgetSettingsProps {
  tokens: Token[];
  historicalPeriods: HistoricalPeriod[];
}

export const TokenBalanceWidgetSettings: React.FC<
  TokenBalanceWidgetSettingsProps
> = ({ tokens, historicalPeriods }) => {
  return (
    <>
      <Flex flex={'1'} flexDirection={'column'}>
        <Flex mb={'2'}>
          <TokenSelector tokens={tokens} />
        </Flex>
        <HistoricalPeriodSelector historicalPeriods={historicalPeriods} />
      </Flex>
    </>
  );
};
