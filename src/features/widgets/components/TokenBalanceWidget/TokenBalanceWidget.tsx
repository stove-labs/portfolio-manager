import React, { useMemo } from 'react';
import {
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import BigNumber from 'bignumber.js';
import { WidgetWrapper } from '../WidgetWrapper/WidgetWrapper';
import { ChangeIndicator } from '../../../shared/components/ChangeIndicator/ChangeIndicator';
import { Token } from '../../../../config/config/tokens';
import { isNativeToken } from '../../../../config/lib/helpers';
import { FiatAmount } from '../../../shared/components/FiatAmount/FiatAmount';
import { CurrencyTicker } from '../../../../config/config/currencies';
import {
  Balance,
  toDecimals,
} from '../../../chain/balances/lib/balances';
import { SpotPrice } from '../../../fiat/lib/fiat';
import { FormattedBalance } from '../../../shared/components/FormattedBalance/FormattedBalance';
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
  historicalBalance?: Balance;
  spotPriceToken?: SpotPrice;
  spotPriceTokenHistorical?: SpotPrice;
  spotPriceNativeToken?: SpotPrice;
  spotPriceNativeTokenHistorical?: SpotPrice;
  currency?: CurrencyTicker;
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
  spotPriceTokenHistorical,
  spotPriceNativeToken,
  spotPriceNativeTokenHistorical,
  currency,
  isLoading,
  onWidgetRemove,
  onSettingsChange,
  settings,
  settingsDisabled,
}) => {
  // TODO: extract priceToFiat/Historical and fiatBalance/Historical to hooks
  // it should not be the responsibility of a presentational component to calculate
  // all of the data below
  const priceToFiat = useMemo(() => {
    if (!spotPriceToken || !spotPriceNativeToken) return;
    return BigNumber(spotPriceToken.price)
      .multipliedBy(BigNumber(spotPriceNativeToken.price))
      .toFixed(6);
  }, [spotPriceToken, spotPriceNativeToken]);

  const priceToFiatHistorical = useMemo(() => {
    if (!spotPriceTokenHistorical || !spotPriceNativeTokenHistorical) return;
    return BigNumber(spotPriceTokenHistorical.price)
      .multipliedBy(BigNumber(spotPriceNativeTokenHistorical.price))
      .toFixed(6);
  }, [spotPriceTokenHistorical, spotPriceNativeTokenHistorical]);

  const historicalFiatBalance = useMemo<
    Pick<Balance, 'amount'> | undefined
  >(() => {
    if (!historicalBalance?.amount || !priceToFiatHistorical) return;

    const amount = new BigNumber(toDecimals(historicalBalance, token.id))
      .multipliedBy(priceToFiatHistorical)
      .toFixed(2);
    return { amount };
  }, [historicalBalance?.amount, token, priceToFiatHistorical]);

  // TODO: fix NaN for XTZ
  const fiatBalance = useMemo<Pick<Balance, 'amount'> | undefined>(() => {
    if (!balance?.amount || !priceToFiat) return;
    console.log('fiatBalance', { token, balance, priceToFiat });
    const amount = new BigNumber(toDecimals(balance, token.id))
      .multipliedBy(priceToFiat)
      .toFixed(2);
    return { amount };
  }, [balance?.amount, token, priceToFiat]);

  const fiatBalancePercentageChange = useMemo(() => {
    return percentageChange(
      Number(historicalFiatBalance?.amount),
      Number(fiatBalance?.amount)
    );
  }, [fiatBalance?.amount, historicalFiatBalance?.amount]);

  const balancePercentageChange = useMemo(() => {
    return percentageChange(
      Number(historicalBalance?.amount),
      Number(balance?.amount)
    );
  }, [balance?.amount, historicalBalance?.amount]);

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
            <SkeletonCircle
              fadeDuration={0}
              isLoaded={!isLoading}
              size={'55px'}
            >
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
            <Skeleton fadeDuration={0} isLoaded={!isLoading}>
              <Flex>
                <Text
                  color={'gray.700'}
                  fontSize={'2xl'}
                  fontWeight={'extrabold'}
                  lineHeight={'26px'}
                >
                  <FormattedBalance balance={balance} token={token} />
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
            <Skeleton isLoaded={!isLoading}>
              <Flex>
                <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'xs'}
                  fontWeight={'normal'}
                >
                  <FiatAmount
                    amount={fiatBalance?.amount}
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
            fadeDuration={0}
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
              {!isNativeToken(token) ? (
                <>
                  1 {token?.symbol} = {spotPriceToken?.price ?? emDash} XTZ,
                </>
              ) : (
                <></>
              )}
              1 {token?.symbol} ={' '}
              <FiatAmount amount={priceToFiat} currencyTicker={currency} />
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
    </WidgetWrapper>
  );
};
