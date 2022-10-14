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
import { Token } from '../../store/chainData/useChainDataStore';
import {
  HistoricalPeriod,
  TokenBalanceWidgetSettings,
} from './TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';

export interface FiatBalance {
  amount?: string;
}

export interface Balance {
  amount?: string;
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
  token?: Token;
  balance?: Balance;
  historicalBalance?: Balance;
  isLoading: boolean;
}

export const percentageChange = (start: number, end: number): number => {
  if (start === Infinity || end === Infinity) return 0;
  if (start === -Infinity || end === -Infinity) return 0;
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;
  if (start === 0 || end === 0) return 0;

  return ((end - start) / start) * 100;
};

export const TokenBalanceWidget: React.FC<
  TokenBalanceWidgetProps & WidgetProps<TokenBalanceWidgetSettingsData>
> = ({
  token,
  balance,
  historicalBalance,
  isLoading,
  onWidgetRemove,
  onSettingsChange,
  settings,
}) => {
  const balancePercentageChange = useMemo(() => {
    return percentageChange(
      Number(historicalBalance?.amount),
      Number(balance?.amount)
    );
  }, [balance, historicalBalance, isLoading]);

  const balanceFiatPercentageChange = useMemo(() => {
    return percentageChange(
      Number(historicalBalance?.fiatBalance.amount),
      Number(balance?.fiatBalance.amount)
    );
  }, [balance, historicalBalance]);

  const historicalPeriods: HistoricalPeriod[] = ['24h', '7d', '30d'];

  return (
    <WidgetWrapper
      settings={settings}
      // TODO: add TokenBalanceWidgetSettings container
      settingsContent={
        <TokenBalanceWidgetSettings historicalPeriods={historicalPeriods} />
      }
      // TODO: this cant be undefined
      title={`${token?.symbol ?? 'Loading'} balance (${
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
          <Flex
            flexDirection={'column'}
            justifyContent={'center'}
            pl={'0'}
            pr={'3'}
          >
            <SkeletonCircle isLoaded={!isLoading} size={'55px'}>
              <img
                src={
                  // kusd
                  `https://services.tzkt.io/v1/avatars/${
                    token?.contract.address ??
                    'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV'
                  }`
                  // quipu
                  // 'https://services.tzkt.io/v1/avatars/KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb'
                }
                width={'55px'}
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
                  {balance?.amount
                    ? Number(balance.amount) > 1
                      ? abbreviateNumber(
                          Number(Number(balance.amount).toFixed(6)),
                          2
                        )
                      : Number(balance.amount).toFixed(6)
                    : '-'}
                </Text>
                {/* ticker */}
                <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  lineHeight={'26px'}
                  pl={'1'}
                  position={'relative'}
                >
                  {token?.symbol ?? 'Loading'}
                </Text>
                <ChangeIndicator change={balancePercentageChange} size={'lg'} />
              </Flex>
            </Skeleton>

            {/* fiat balance */}
            <Skeleton isLoaded={!isLoading} mt={isLoading ? '1' : '0'}>
              <Flex>
                <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'xs'}
                  fontWeight={'normal'}
                >
                  $
                  {balance?.fiatBalance.amount
                    ? Number(balance?.fiatBalance.amount) > 1
                      ? abbreviateNumber(
                          Number(
                            Number(balance?.fiatBalance.amount).toFixed(6)
                          ),
                          2
                        )
                      : Number(balance?.fiatBalance.amount).toFixed(6)
                    : '-'}
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
        <Flex flexDirection={'column'} justifyContent={'end'}>
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
              1 {token?.symbol ?? 'Loading'} = 1.456 XTZ, 1
              {token?.symbol ?? 'Loading'} = $ 0.99
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
    </WidgetWrapper>
  );
};
