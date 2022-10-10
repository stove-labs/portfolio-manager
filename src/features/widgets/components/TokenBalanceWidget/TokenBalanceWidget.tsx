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
  amount: string;
  fiatBalance: FiatBalance;
}

export interface TokenBalanceWidgetProps {
  token: Token;
  balance: Balance;
  historicalBalance: Balance;
  isLoading: boolean;
}

export interface ChangeIndicatorProps {
  size: 'sm' | 'lg';
  change: number;
}

export const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({
  size,
  change,
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
  const trend = change > 0 ? 'upwards' : 'downwards';
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
      <Text fontSize={sizing.fontSize}>({change.toFixed(2)}%)</Text>
    </Flex>
  );
};

export const percentageChange = (start: number, end: number): number => {
  if (start === Infinity || end === Infinity) return 0;
  if (start === -Infinity || end === -Infinity) return 0;
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;
  if (start === 0 && end === 0) return 0;

  return ((end - start) / start) * 100;
};

export const TokenBalanceWidget: React.FC<TokenBalanceWidgetProps> = ({
  token,
  balance,
  historicalBalance,
  isLoading,
}) => {
  const balancePercentageChange = useMemo(() => {
    return percentageChange(
      Number(balance.amount),
      Number(historicalBalance.amount)
    );
  }, [balance, historicalBalance]);

  const balanceFiatPercentageChange = useMemo(() => {
    return percentageChange(
      Number(balance.fiatBalance.amount),
      Number(historicalBalance.fiatBalance.amount)
    );
  }, [balance, historicalBalance]);

  return (
    <WidgetWrapper
      size={'sm'}
      title={`${token.ticker} balance (24h)`}
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

          {/* balances */}
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
                  {Number(balance.amount) > 1
                    ? abbreviateNumber(Number(balance.amount), 2)
                    : Number(balance.amount).toFixed(6)}
                </Text>
                {/* ticker */}
                <Text
                  color={useColorModeValue('gray.400', 'gray.400')}
                  lineHeight={'26px'}
                  pl={'2'}
                  position={'relative'}
                >
                  {token.ticker}
                </Text>
                <ChangeIndicator change={balancePercentageChange} size={'lg'} />
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
                  $
                  {Number(balance.fiatBalance.amount) > 1
                    ? abbreviateNumber(Number(balance.fiatBalance.amount), 2)
                    : Number(balance.fiatBalance.amount).toFixed(6)}
                </Text>
                <ChangeIndicator
                  change={balanceFiatPercentageChange}
                  size={'sm'}
                />
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
              1 {token.ticker} = 1.456 XTZ, 1 {token.ticker} = $ 0.99
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
    </WidgetWrapper>
  );
};
