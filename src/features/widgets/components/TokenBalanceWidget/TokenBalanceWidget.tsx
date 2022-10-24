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
import { Token } from '../../../../config/config/tokens';
import { isNativeToken } from '../../../../config/lib/helpers';
import { FiatAmount } from '../../../shared/components/FiatAmount/FiatAmount';
import { CurrencyTicker } from '../../../../config/config/currencies';
import {
  Balance,
  MAX_DECIMALS,
  toDecimals,
} from '../../../chain/balances/lib/balances';
import {
  HistoricalPeriod,
  TokenBalanceWidgetSettings,
} from './TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';

export interface FiatBalance {
  amount?: string;
}

export interface WidgetProps<T> {
  onWidgetRemove: () => void;
  onSettingsChange: (settings: T) => void;
  settings?: T;
  settingsDisabled?: boolean;
}

export interface TokenBalanceWidgetSettingsData {
  token: string;
  historicalPeriod: HistoricalPeriod;
}

export interface TokenBalanceWidgetProps {
  token: Token;
  balance?: Balance;
  fiatBalance?: Balance;
  historicalBalance?: Balance;
  historicalFiatBalance?: Balance;
  spotPriceToken?: string;
  spotPriceNativeToken?: string;
  currency: CurrencyTicker;
  isLoading: boolean;
}

export const percentageChange = (start: number, end: number): number => {
  if (start === Infinity || end === Infinity) return 0;
  if (start === -Infinity || end === -Infinity) return 0;
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;
  if (start === 0 || end === 0) return 0;

  return ((end - start) / start) * 100;
};

export const emDash: string = '—';
export const TokenBalanceWidget: React.FC<
  TokenBalanceWidgetProps & WidgetProps<TokenBalanceWidgetSettingsData>
> = ({
  token,
  balance,
  historicalBalance,
  spotPriceToken,
  spotPriceNativeToken,
  currency,
  isLoading,
  onWidgetRemove,
  onSettingsChange,
  settings,
  settingsDisabled,
  fiatBalance,
  historicalFiatBalance,
}) => {
  const balancePercentageChange = useMemo(() => {
    return percentageChange(
      Number(historicalBalance?.amount),
      Number(balance?.amount)
    );
  }, [balance?.amount, historicalBalance?.amount]);

  // spot prices are in tokenA-USD
  const priceToNativeToken = useMemo(() => {
    // if (!spotPriceToken || !spotPriceNativeToken) return;
    // return BigNumber(spotPriceToken)
    //   .dividedBy(BigNumber(spotPriceNativeToken))
    //   .toFixed(6);
  }, [spotPriceToken, spotPriceNativeToken]);

  const fiatBalancePercentageChange = useMemo(() => {
    return percentageChange(
      Number(historicalFiatBalance?.amount),
      Number(fiatBalance?.amount)
    );
  }, [fiatBalance?.amount, historicalFiatBalance?.amount]);
  console.log('');
  const historicalPeriods: HistoricalPeriod[] = ['24h', '7d', '30d'];

  return (
    <WidgetWrapper
      settingsDisabled={settingsDisabled}
      title={`${token?.symbol ?? 'Loading'} balance (${
        settings?.historicalPeriod ?? '24h'
      })`}
      // TODO: this cant be undefined
      onSettingsChange={onSettingsChange}
      onWidgetRemove={onWidgetRemove}
      settings={settings}
      // TODO: add TokenBalanceWidgetSettings container
      settingsContent={
        <TokenBalanceWidgetSettings historicalPeriods={historicalPeriods} />
      }
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
                  {/* TODO: create <FormattedBalance /> */}
                  {balance?.amount
                    ? Number(toDecimals(balance, token?.id)) > 1
                      ? abbreviateNumber(
                          Number(toDecimals(balance, token?.id)),
                          MAX_DECIMALS
                        )
                      : Number(toDecimals(balance, token?.id))
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
                  {/* <FiatAmount
                    amount={
                      Number(alanceb?.fiatBalance.amount) > 1
                        ? abbreviateNumber(
                            Number(
                              Number(balance?.fiatBalance.amount).toFixed(2)
                            ),
                            2
                          )
                        : Number(balance?.fiatBalance.amount).toFixed(2)
                    }
                    currencyTicker={currency}
                  /> */}
                  {/* temporary placeholder */}
                  <FiatAmount
                    amount={abbreviateNumber(
                      Number(Number(1000).toFixed(2)),
                      2
                    )}
                    currencyTicker={currency}
                  />
                </Text>
                <ChangeIndicator
                  change={fiatBalancePercentageChange}
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
              1 {token?.symbol} = {priceToNativeToken ?? emDash} XTZ, 1{' '}
              {token?.symbol} ={' '}
              <FiatAmount amount={spotPriceToken} currencyTicker={currency} />
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
    </WidgetWrapper>
  );
};
