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
import { BigNumber } from 'bignumber.js';
import { WidgetWrapper } from '../WidgetWrapper/WidgetWrapper';
import { ChangeIndicator } from '../../../shared/components/ChangeIndicator/ChangeIndicator';
import { Token } from '../../store/chainData/useChainDataStore';
import { isNativeToken } from '../../store/selectors/chainData/useChainDataSelectors';
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
  spotPriceToken?: string;
  spotPriceNativeToken?: string;
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
  spotPriceToken,
  spotPriceNativeToken,
  isLoading,
  onWidgetRemove,
  onSettingsChange,
  settings,
}) => {
  const emDash: string = '—';
  const balancePercentageChange = useMemo(() => {
    return percentageChange(
      Number(historicalBalance?.amount),
      Number(balance?.amount)
    );
  }, [balance?.amount, historicalBalance?.amount]);

  // spot prices are in tokenA-USD
  const priceToNativeToken = useMemo(() => {
    if (!spotPriceToken || !spotPriceNativeToken) return;

    return BigNumber(spotPriceToken)
      .dividedBy(BigNumber(spotPriceNativeToken))
      .toFixed(6);
  }, [spotPriceToken, spotPriceNativeToken]);

  const tokenAmountPercentageChange = useMemo(() => {
    if (!historicalBalance?.fiatBalance.amount || !balance?.fiatBalance.amount)
      return 0;

    return percentageChange(
      Number(historicalBalance?.fiatBalance.amount),
      Number(balance?.fiatBalance.amount)
    );
  }, [balance?.fiatBalance.amount, historicalBalance?.fiatBalance.amount]);

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
                  isNativeToken(token)
                    ? 'https://tzkt.io/tezos-logo.svg'
                    : `https://services.tzkt.io/v1/avatars/${
                        token?.contract.address ?? ''
                      }`
                }
                style={{ maxHeight: '100%' }}
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
                    : emDash}
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
                            Number(balance?.fiatBalance.amount).toFixed(2)
                          ),
                          2
                        )
                      : Number(balance?.fiatBalance.amount).toFixed(2)
                    : emDash}
                </Text>
                <ChangeIndicator
                  change={tokenAmountPercentageChange}
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
              1 {token?.symbol ?? 'Loading'} = {priceToNativeToken ?? emDash}{' '}
              XTZ, 1 {token?.symbol ?? 'Loading'} = ${spotPriceToken ?? emDash}
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
    </WidgetWrapper>
  );
};
