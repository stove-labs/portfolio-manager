import React, { useEffect } from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { abbreviateNumber } from 'js-abbreviation-number';
import { WidgetWrapper } from '../WidgetWrapper/WidgetWrapper';
import { useDispatchUniqueContext } from '../../providers/DispatchUniqueProvider';

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
  const { addToDispatchQueue } = useDispatchUniqueContext();
  useEffect(() => {
    console.log('TokenBalanceWidget');
    addToDispatchQueue({
      type: 'INCREMENT_BY',
      payload: { amount: 1 },
    });
  }, [addToDispatchQueue]);
  // const balancePercentageChange = useMemo(() => {
  //   return '70%';
  // }, [balance, historicalBalance]);

  return (
    <WidgetWrapper
      size={'sm'}
      title={'kUSD balance (24h)'}
      onTitleSubmit={console.log}
    >
      <Flex>
        <Flex>
          <Flex flexDirection={'column'}>
            {/* Balance */}
            <Flex alignItems={'baseline'} gap={'1'}>
              <Text
                color={useColorModeValue('gray.700', 'gray.700')}
                fontSize={'2xl'}
                fontWeight={'semibold'}
                lineHeight={'24px'}
                paddingTop={'0'}
              >
                {abbreviateNumber(Number(balance.amount), 2)}
              </Text>
              <Text
                fontSize={'sm'}
                fontWeight={'medium'}
                opacity={'0.8'}
                position={'relative'}
                top={'-0.5px'}
              >
                {balance.token.ticker}
              </Text>
            </Flex>
            <Flex
              alignItems={'center'}
              position={'relative'}
              textAlign={'center'}
              top={'-3px'}
            >
              <Text
                flexDirection={'row'}
                fontSize={'xx-small'}
                fontWeight={'normal'}
                opacity={'.5'}
                paddingTop={'0.5'}
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
    </WidgetWrapper>
  );
};
