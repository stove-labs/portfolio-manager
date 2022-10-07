import React from 'react';
import { Flex } from '@chakra-ui/react';
import { HistoricalPeriodSelector } from '../../../../shared/components/HistoricalPeriodSelector/HistoricalPeriodSelector';
import { TokenSelector } from '../../../../shared/components/TokenSelector/TokenSelector';

export const TokenBalanceWidgetSettings: React.FC = () => {
  return (
    <>
      <Flex flex={'1'} flexDirection={'column'}>
        <Flex mb={'2'}>
          <TokenSelector />
        </Flex>
        <HistoricalPeriodSelector />
      </Flex>
    </>
  );
};
