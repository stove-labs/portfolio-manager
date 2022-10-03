import React from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { abbreviateNumber } from 'js-abbreviation-number';

export interface Token {
  fullName: string;
  ticker: string;
}

export interface USDBalance {
  amount: string;
}

export interface Balance {
  token: Token;
  amount: string;
  usdBalance: USDBalance;
}

export interface TokenBalanceWidgetProps {
  token: Token;
  balance: Balance;
  historicalBalance: Balance;
  isLoading: boolean;
}

export const TokenBalanceWidget: React.FC<TokenBalanceWidgetProps> = ({
  token,
  balance,
  historicalBalance,
  isLoading,
}) => {
  // const balancePercentageChange = useMemo(() => {
  //   return '70%';
  // }, [balance, historicalBalance]);

  return (
    <Flex>
      <Flex>
        <Flex flexDirection={'column'}>
          {/* Balance */}
          <Flex alignItems={'baseline'} gap={'1'}>
            <Text
              color={useColorModeValue('gray.700', 'gray.700')}
              fontSize={'2xl'}
              fontWeight={'extrabold'}
            >
              {abbreviateNumber(Number(balance.amount), 2)}
            </Text>
            <Text fontSize={'sm'} position={'relative'} top={'-0.5px'}>
              {balance.token.ticker}
            </Text>
          </Flex>
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            position={'relative'}
            textAlign={'center'}
            top={'-3px'}
          >
            <Text
              flexDirection={'row'}
              fontSize={'xs'}
              fontWeight={'nomral'}
              opacity={'.8'}
            >
              <Flex gap={'0.5'}>
                <Box>
                  {abbreviateNumber(Number(balance.usdBalance.amount), 2)}
                </Box>
                <Box>$</Box>
              </Flex>
            </Text>
          </Flex>
        </Flex>

        {/* <Stat>
          <StatHelpText>
            <StatArrow type={'increase'} />
            {balancePercentageChange}
          </StatHelpText>
        </Stat> */}
      </Flex>
    </Flex>
  );
};
