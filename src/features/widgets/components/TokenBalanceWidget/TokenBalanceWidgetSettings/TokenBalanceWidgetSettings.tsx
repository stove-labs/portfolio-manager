import React from 'react';
import { Flex } from '@chakra-ui/react';
import { HistoricalPeriodSelector } from '../../../../shared/components/HistoricalPeriodSelector/HistoricalPeriodSelector';
import { TokenSelector } from '../../../../shared/components/TokenSelector/TokenSelector';
import { getAllTokens } from '../../../../../config/lib/helpers';

export type HistoricalPeriod = '24h' | '7d' | '30d';

export interface TokenBalanceWidgetSettingsData {
  historicalPeriod: HistoricalPeriod;
}

export interface TokenBalanceWidgetSettingsProps {
  historicalPeriods: HistoricalPeriod[];
}

export const historicalPeriodToHours = (
  historicalPeriod: HistoricalPeriod
): string => {
  switch (historicalPeriod) {
    case '24h':
      return '24';
    case '30d':
      return `${30 * 24}`;
    case '7d':
      return `${7 * 24}`;
  }
};

export const TokenBalanceWidgetSettings: React.FC<
  TokenBalanceWidgetSettingsProps
> = ({ historicalPeriods }) => {
  const tokens = getAllTokens();

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
