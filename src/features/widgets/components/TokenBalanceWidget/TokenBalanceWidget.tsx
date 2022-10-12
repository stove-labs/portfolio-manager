import React, { useMemo } from 'react';
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
  id: string;
  fullName: string;
  ticker: string;
  address: string;
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
  token: string;
  historicalPeriod: HistoricalPeriod;
}

export interface TokenBalanceWidgetProps {
  balance: Balance;
  historicalBalance: Balance;
  isLoading: boolean;
  settingTokens?: Token[];
}

export const percentageChange = (start: number, end: number): number => {
  if (start === Infinity || end === Infinity) return 0;
  if (start === -Infinity || end === -Infinity) return 0;
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;
  if (start === 0 && end === 0) return 0;

  return ((end - start) / start) * 100;
};

export const TokenBalanceWidget: React.FC<
  TokenBalanceWidgetProps & WidgetProps<TokenBalanceWidgetSettingsData>
> = ({
  balance,
  historicalBalance,
  isLoading,
  onWidgetRemove,
  onSettingsChange,
  settings,
  settingTokens,
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

  const defaultTokens: Token[] = [
    {
      id: '42290944933889',
      ticker: 'kUSD',
      fullName: 'Kolibri USD',
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
    },
    {
      id: '74079757402113',
      ticker: 'QUIPU',
      fullName: 'Quipuswap',
      address: 'KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb',
    },
    {
      id: '24975299837953',
      ticker: 'tzBTC',
      fullName: 'tzBTC',
      address: 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn',
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
          tokens={settingTokens ?? defaultTokens}
        />
      }
      // TODO: this cant be undefined
      title={`${balance.token.ticker} balance (${
        settings?.historicalPeriod ?? '24h'
      })`}
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
                  `https://services.tzkt.io/v1/avatars/${
                    balance.token.address ??
                    'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV'
                  }`
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
                    ? abbreviateNumber(
                        Number(Number(balance.amount).toFixed(6)),
                        2
                      )
                    : Number(balance.amount).toFixed(6)}
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
                    ? abbreviateNumber(
                        Number(Number(balance.fiatBalance.amount).toFixed(6)),
                        2
                      )
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
              1 {balance.token.ticker} = 1.456 XTZ, 1 {balance.token.ticker} = $
              0.99
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
    </WidgetWrapper>
  );
};
