import React from 'react';
import {
  Box,
  createIcon,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { abbreviateNumber } from 'js-abbreviation-number';
import { WidgetWrapper } from '../WidgetWrapper/WidgetWrapper';

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

export const WalletIcon = createIcon({
  displayName: 'WalletIcon',
  viewBox: '0 0 24 24',
  path: (
    <g>
      <path
        d="M4.447 4.818h14.062c.164 0 .328.01.491.031a2.9 2.9 0 00-3.406-2.441L4.03 4.382h-.013a2.9 2.9 0 00-1.805 1.149 3.848 3.848 0 012.236-.713zM18.51 5.875H4.446a2.816 2.816 0 00-2.813 2.812v8.438a2.816 2.816 0 002.813 2.812h14.062a2.815 2.815 0 002.813-2.812V8.687a2.815 2.815 0 00-2.813-2.812zm-2.088 8.437a1.406 1.406 0 110-2.811 1.406 1.406 0 010 2.811z"
        fill="currentColor"
      />
      <path
        d="M1.656 11.651V7.28c0-.952.528-2.549 2.358-2.895 1.553-.291 3.091-.291 3.091-.291s1.011.703.176.703-.813 1.077 0 1.077 0 1.032 0 1.032L4.007 10.62l-2.35 1.032z"
        fill="currentColor"
      />
    </g>
  ),
});

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
    <WidgetWrapper
      size={'sm'}
      title={'kUSD balance (24h)'}
      onTitleSubmit={console.log}
    >
      <Flex alignItems={'center'} flexDirection={'row'}>
        <Flex
          alignItems={'center'}
          bg="white.200"
          borderRadius={'12px'}
          h={'45px'}
          justifyContent={'center'}
          w={'45px'}
        >
          <WalletIcon
            color={useColorModeValue('gray.900', 'whiteAlpha.900')}
            h={'24px'}
            w={'24px'}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={'1'}>
          <Text
            color={useColorModeValue('gray.900', 'whiteAlpha.900')}
            fontSize={'xs'}
            fontWeight={'normal'}
            opacity={'.6'}
            padding={'0'}
          >
            {'kUSD balance (24h)'}
          </Text>
          {/* Balance */}
          <Flex alignItems={'baseline'} gap={'2'}>
            <Text
              color={useColorModeValue('gray.700', 'whiteAlpha.900')}
              fontSize={'3xl'}
              fontWeight={'semibold'}
              lineHeight={'24px'}
              paddingTop={'0'}
            >
              {abbreviateNumber(Number(balance.amount), 2)}
            </Text>
            <Text
              color={useColorModeValue('gray.700', 'whiteAlpha.900')}
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
              color={useColorModeValue('gray.800', 'whiteAlpha.800')}
              flexDirection={'row'}
              fontSize={'x-small'}
              fontWeight={'normal'}
              opacity={'0.6'}
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
    </WidgetWrapper>
  );
};
