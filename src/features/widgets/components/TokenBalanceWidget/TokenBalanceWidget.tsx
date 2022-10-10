import React from 'react';
import {
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { abbreviateNumber } from 'js-abbreviation-number';
import { WidgetWrapper } from '../WidgetWrapper/WidgetWrapper';
import { ChangeIndicator } from '../../../shared/components/ChangeIndicator/ChangeIndicator';
import {
  HistoricalPeriod,
  TokenBalanceWidgetSettings,
} from './TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';

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

export interface WidgetProps<T> {
  onWidgetRemove: () => void;
  onSettingsChange: (settings: T) => void;
  settings?: T;
}

export interface TokenBalanceWidgetSettingsData {
  token: Token;
  historicalPeriod: HistoricalPeriod;
}

export interface TokenBalanceWidgetProps {
  balance: Balance;
  historicalBalance: Balance;
  isLoading: boolean;
}

export const TokenBalanceWidget: React.FC<
  TokenBalanceWidgetProps & WidgetProps<TokenBalanceWidgetSettingsData>
> = ({
  balance,
  historicalBalance,
  isLoading,
  onWidgetRemove,
  onSettingsChange,
  settings,
}) => {
  // const balancePercentageChange = useMemo(() => {
  //   return '70%';
  // }, [balance, historicalBalance]);

  const tokens: Token[] = [
    {
      ticker: 'kUSD',
      fullName: 'Kolibri USD',
    },
    {
      ticker: 'QUIPU',
      fullName: 'Quipuswap',
    },
  ];

  const historicalPeriods: HistoricalPeriod[] = ['24h', '7d', '30d'];

  return (
    <WidgetWrapper
      settings={settings}
      // TODO: add TokenBalanceWidgetSettings container
      settingsContent={
        <TokenBalanceWidgetSettings
          historicalPeriods={historicalPeriods}
          tokens={tokens}
        />
      }
      title={'kUSD balance (24h)'}
      onSettingsChange={onSettingsChange}
      onTitleSubmit={console.log}
      onWidgetRemove={onWidgetRemove}
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
