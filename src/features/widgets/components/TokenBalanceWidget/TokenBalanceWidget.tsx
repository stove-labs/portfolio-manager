import React, { useMemo } from 'react';
import {
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  TextProps,
  useColorModeValue,
} from '@chakra-ui/react';

import { abbreviateNumber } from 'js-abbreviation-number';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { WidgetWrapper } from '../WidgetWrapper/WidgetWrapper';

export interface Token {
  fullName: string;
  ticker: string;
}

export interface FiatBalance {
  amount: string;
}

export interface Balance {
  token: Token;
  amount: string;
  fiatBalance: FiatBalance;
}

export interface TokenBalanceWidgetProps {
  balance: Balance;
  historicalBalance: Balance;
  isLoading: boolean;
}

export interface ChangeIndicatorProps {
  size: 'sm' | 'lg';
  trend: 'upwards' | 'downwards';
}

export const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({
  size,
  trend,
}) => {
  const sizing = useMemo<{
    iconSize: SizeProp;
    fontSize: TextProps['fontSize'];
  }>(() => {
    switch (size) {
      case 'lg':
        return {
          iconSize: '1x',
          fontSize: 'xs',
        };

      case 'sm':
        return {
          iconSize: 'xs',
          fontSize: 'x-small',
        };
    }
  }, [size]);
  const upwardsTrendColor = useColorModeValue('green.400', 'green.400');
  const downwardsTrendColor = useColorModeValue('red.400', 'red.400');
  const trendColor = useMemo(() => {
    switch (trend) {
      case 'upwards':
        return upwardsTrendColor;
      case 'downwards':
        return downwardsTrendColor;
    }
  }, [trend, upwardsTrendColor, downwardsTrendColor]);
  const trendIcon = useMemo(() => {
    switch (trend) {
      case 'upwards':
        return faCaretUp;
      case 'downwards':
        return faCaretDown;
    }
  }, [trend]);
  const trendIconOffset = useMemo(() => {
    switch (trend) {
      case 'upwards':
        return '0.5px';
      case 'downwards':
        return '-0.5px';
    }
  }, [trend]);
  return (
    <Flex
      alignItems={'center'}
      color={trendColor}
      justifyContent={'center'}
      pl={'2'}
    >
      <Flex alignItems={'center'} justifyContent={'center'} pr={'1'}>
        <FontAwesomeIcon
          icon={trendIcon}
          size={sizing.iconSize}
          style={{
            position: 'relative',
            top: trendIconOffset,
          }}
        />
      </Flex>
      <Text fontSize={sizing.fontSize}>(+36%)</Text>
    </Flex>
  );
};

export const TokenBalanceWidget: React.FC<TokenBalanceWidgetProps> = ({
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
      <Flex direction={'column'} minHeight={'117px'} width={'100%'}>
        {/* content */}
        <Flex flex={'1'}>
          {/* token logo */}
          <Flex flexDirection={'column'} justifyContent={'center'} pr={'3'}>
            <SkeletonCircle isLoaded={!isLoading} size={'50px'}>
              <img
                src={
                  // kusd
                  'https://services.tzkt.io/v1/avatars/KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV'
                  // quipu
                  // 'https://services.tzkt.io/v1/avatars/KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb'
                }
                width={'50px'}
              />
            </SkeletonCircle>
          </Flex>

          {/* talances */}
          <Flex flex={'1'} flexDirection={'column'} justifyContent={'center'}>
            {/* token balance */}
            <Skeleton isLoaded={!isLoading}>
              <Flex>
                <Text
                  color={'gray.700'}
                  fontSize={'2xl'}
                  fontWeight={'extrabold'}
                  lineHeight={'26px'}
                >
                  {abbreviateNumber(Number(balance.amount), 2)}
                </Text>
                {/* ticker */}
                <Text
                  color={useColorModeValue('gray.400', 'gray.400')}
                  lineHeight={'26px'}
                  pl={'2'}
                  position={'relative'}
                >
                  {balance.token.ticker}
                </Text>
                <ChangeIndicator size={'lg'} trend={'upwards'} />
              </Flex>
            </Skeleton>

            {/* fiat balance */}
            <Skeleton isLoaded={!isLoading} mt={isLoading ? '1' : '0'}>
              <Flex>
                <Text
                  color={useColorModeValue('gray.400', 'gray.400')}
                  fontSize={'xs'}
                  fontWeight={'normal'}
                >
                  ${abbreviateNumber(Number(balance.fiatBalance.amount), 2)}
                </Text>
                <ChangeIndicator size={'sm'} trend={'downwards'} />
              </Flex>
            </Skeleton>
          </Flex>
        </Flex>
        {/* footer */}
        <Flex flexDirection={'column'}>
          <Skeleton
            isLoaded={!isLoading}
            position={'relative'}
            top={isLoading ? '-8px' : '0'}
          >
            <Divider borderColor={'gray.300'} />

            <Text
              color={'gray.400'}
              fontSize={'x-small'}
              fontWeight={'normal'}
              letterSpacing={'tight'}
              pt={'1.5'}
              textAlign={'left'}
            >
              1 kUSD = 1.456 XTZ, 1 kUSD = $ 0.99
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
    </WidgetWrapper>
  );
};
