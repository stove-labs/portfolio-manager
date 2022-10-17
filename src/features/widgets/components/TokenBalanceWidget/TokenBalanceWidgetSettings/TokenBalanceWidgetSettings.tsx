import React from 'react';
import { Flex } from '@chakra-ui/react';
import { HistoricalPeriodSelector } from '../../../../shared/components/HistoricalPeriodSelector/HistoricalPeriodSelector';
import { TokenSelector } from '../../../../shared/components/TokenSelector/TokenSelector';
import { useSelectAllTokens } from '../../../store/selectors/chainData/useChainDataSelectors';

export type HistoricalPeriod = '24h' | '7d' | '30d';

export interface TokenBalanceWidgetSettingsData {
  historicalPeriod: HistoricalPeriod;
}

export interface TokenBalanceWidgetSettingsProps {
  historicalPeriods: HistoricalPeriod[];
}

export const TokenBalanceWidgetSettings: React.FC<
  TokenBalanceWidgetSettingsProps
> = ({ historicalPeriods }) => {
  const tokens = useSelectAllTokens();

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
