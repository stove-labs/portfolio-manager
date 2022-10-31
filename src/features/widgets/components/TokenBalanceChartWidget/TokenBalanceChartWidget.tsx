import { Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import { abbreviateNumber } from 'js-abbreviation-number';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';
import BigNumber from 'bignumber.js';
import { first, last, sortBy } from 'lodash';
import { Token } from '../../../../config/config/tokens';
import { isNativeToken } from '../../../../config/lib/helpers';
import {
  Balance,
  MAX_DECIMALS,
  toDecimals,
} from '../../../chain/balances/lib/balances';
import { ChangeIndicator } from '../../../shared/components/ChangeIndicator/ChangeIndicator';
import { FiatAmount } from '../../../shared/components/FiatAmount/FiatAmount';
import {
  emDash,
  percentageChange,
  TokenBalanceWidgetSettingsData,
  WidgetProps,
} from '../TokenBalanceWidget/TokenBalanceWidget';
import {
  HistoricalPeriod,
  TokenBalanceWidgetSettings,
} from '../TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';
import { WidgetWrapper } from '../WidgetWrapper/WidgetWrapper';
import { SpotPrice } from '../../../fiat/lib/fiat';
import { Block } from '../../../chain/blocks/lib/blocks';
import { levelToDateString } from '../../../chain/blocks/store/useBlocksSelectors';
import { WithStatus } from '../../../chain/blocks/store/useBlocksStore';

ChartJS.register(
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
  Tooltip,
  AnnotationPlugin
);

export type LineChartOptions = Parameters<typeof Line>['0']['options'];
export type LineChartData = Parameters<typeof Line>['0']['data'];

export interface TokenBalanceChartWidgetProps {
  token: Token;
  isLoading: boolean;
  historicalBalances?: Array<WithStatus<Balance> | undefined>;
  currentBalance?: Balance;
  spotPriceNativeToken?: SpotPrice;
  spotPriceToken?: SpotPrice;
  latestBlock?: Block;
}
export type TokenBalanceChartWidgetSettingsData =
  TokenBalanceWidgetSettingsData;
export const TokenBalanceChartWidget: React.FC<
  TokenBalanceChartWidgetProps &
    WidgetProps<TokenBalanceChartWidgetSettingsData>
> = ({
  settingsDisabled,
  token,
  isLoading,
  onSettingsChange,
  onWidgetRemove,
  historicalBalances,
  settings,
  spotPriceNativeToken,
  spotPriceToken,
  latestBlock,
}) => {
  const historicalPeriods: HistoricalPeriod[] = ['24h', '7d', '30d'];
  const [selectedBalance, setSelectedBalance] = useState<Balance>();

  // TODO: sort the balances elsewhere
  historicalBalances = useMemo(() => {
    return sortBy(historicalBalances, (balance) => balance?.data?.level);
  }, [historicalBalances]);

  useEffect(() => {
    if (historicalBalances) setSelectedBalance(last(historicalBalances)?.data);
  }, [historicalBalances]);
  // TODO: set balanceChange on hover to be the currently viewed data point
  const balanceChange = useMemo<Pick<Balance, 'amount'> | undefined>(() => {
    if (!historicalBalances || !selectedBalance) return;
    const firstBalance = historicalBalances[0]?.data;
    if (!firstBalance) return;
    const amount = new BigNumber(selectedBalance.amount)
      .minus(firstBalance.amount)
      .toFixed(Number(token.metadata.decimals));

    return {
      amount,
    };
  }, [selectedBalance, historicalBalances]);

  const priceToFiat = useMemo(() => {
    if (!spotPriceToken || !spotPriceNativeToken) return;
    return BigNumber(spotPriceToken.price)
      .multipliedBy(BigNumber(spotPriceNativeToken.price))
      .toFixed(6);
  }, [spotPriceToken, spotPriceNativeToken]);

  const fiatBalance = useMemo<Pick<Balance, 'amount'> | undefined>(() => {
    if (!balanceChange?.amount || !priceToFiat) return;
    const amount = new BigNumber(toDecimals(balanceChange as Balance, token.id))
      .multipliedBy(priceToFiat)
      .toFixed(2);
    return { amount };
  }, [balanceChange?.amount, token, priceToFiat]);

  // TODO: fix start/end
  const { start, end } = useMemo<{ start: string; end: string }>(() => {
    const firstBalance = first(historicalBalances)?.data;
    const lastBalance = last(historicalBalances)?.data;

    if (!latestBlock || !historicalBalances || !firstBalance || !lastBalance)
      return { start: '', end: '' };
    return {
      start: levelToDateString(latestBlock, firstBalance.level),
      end: levelToDateString(latestBlock, lastBalance.level),
    };
  }, [historicalBalances, latestBlock]);

  const change = useMemo<number>(() => {
    if (!historicalBalances || !selectedBalance) return 0;
    const firstBalance = historicalBalances[0]?.data;
    if (!firstBalance) return 0;
    return percentageChange(
      Number(firstBalance.amount),
      Number(selectedBalance.amount)
    );
  }, [balanceChange, selectedBalance, historicalBalances]);

  const trend =
    Number(balanceChange?.amount) > 0
      ? 'upwards'
      : Number(balanceChange?.amount) < 0
      ? 'downwards'
      : 'neutral';

  const upwardsTrendColor = '#38A169';
  const downwardsTrendColor = '#E53E3E';
  const trendColor = useMemo(() => {
    switch (trend) {
      case 'upwards':
        return upwardsTrendColor;
      case 'downwards':
        return downwardsTrendColor;
      case 'neutral':
        return upwardsTrendColor;
    }
  }, [trend, upwardsTrendColor, downwardsTrendColor]);

  const data = useMemo<LineChartData>(() => {
    if (!historicalBalances)
      return {
        labels: [],
        datasets: [],
      };
    const labels = historicalBalances.map((balance) => balance?.data?.level);

    return {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: historicalBalances.map((balance) => {
            const amount =
              balance?.data?.amount && toDecimals(balance.data, token.id);
            return Number(amount);
          }),
          borderColor: trendColor,
          backgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          pointHoverBackgroundColor: trendColor,
          tension: 0.3,
        },
      ],
    };
  }, [trendColor, historicalBalances, token]);

  const options = useMemo<LineChartOptions>(() => {
    const options: LineChartOptions = {
      animation: false,
      onHover: (event, element) => {
        if (!historicalBalances) return;
        const selectedBalance = historicalBalances[element[0].index]?.data;
        setSelectedBalance(selectedBalance);
      },
      interaction: {
        // mode: 'nearest',
        intersect: false,
        includeInvisible: true,
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        yAxis: {
          display: false,
          grid: {
            display: false,
          },
        },
        xAxis: {
          display: false,

          grid: {
            display: false,
          },
        },
      },
    };
    return options;
  }, [historicalBalances]);

  const handleChartMouseLeave = useCallback(() => {
    if (!historicalBalances) return;
    setTimeout(() => {
      setSelectedBalance(last(historicalBalances)?.data);
    }, 100);
  }, [historicalBalances]);

  return (
    <WidgetWrapper
      settings={settings}
      settingsContent={
        <TokenBalanceWidgetSettings historicalPeriods={historicalPeriods} />
      }
      settingsDisabled={settingsDisabled}
      title={`Token balnace chart (${settings?.historicalPeriod ?? emDash})`}
      onSettingsChange={onSettingsChange}
      onWidgetRemove={onWidgetRemove}
    >
      <Flex
        flex={'1'}
        flexDirection={'column'}
        height={'100%'}
        justifyContent={'space-between'}
      >
        {/* chart header */}
        <Flex alignItems={'start'} justifyContent={'space-between'} mt={'4'}>
          {/* left side */}
          <Flex alignItems={'center'} flexDirection={'row'} minWidth={'200px'}>
            <Flex>
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
            <Flex flex={'1'} flexDirection={'column'} ml={'4'}>
              <Skeleton fadeDuration={0} isLoaded={!isLoading}>
                <Text
                  color={'gray.700'}
                  fontSize={'2xl'}
                  fontWeight={'extrabold'}
                  lineHeight={'28px'}
                >
                  {token.name}
                </Text>
                <Text color={'gray.500'} fontSize={'sm'} lineHeight={'20px'}>
                  {token.symbol}
                </Text>
              </Skeleton>
            </Flex>
          </Flex>

          {/* right side */}
          <Flex
            alignItems={'end'}
            flexDirection={'column'}
            justifyContent={'end'}
            minWidth={'200px'}
          >
            {/* token balance */}
            <Flex alignItems={'center'} flex={'1'}>
              <Skeleton
                fadeDuration={0}
                flex={'1'}
                isLoaded={!isLoading}
                minWidth={'200px'}
              >
                <Flex justifyContent={'end'}>
                  <Flex>
                    <Text
                      color={'gray.700'}
                      fontSize={'2xl'}
                      fontWeight={'extrabold'}
                      lineHeight={'30px'}
                    >
                      {Number(balanceChange?.amount) > 0 ? '+' : ''}
                      {balanceChange?.amount
                        ? Number(
                            toDecimals(balanceChange as Balance, token?.id)
                          ) > 1
                          ? abbreviateNumber(
                              Number(
                                toDecimals(balanceChange as Balance, token?.id)
                              ),
                              MAX_DECIMALS
                            )
                          : Number(
                              toDecimals(balanceChange as Balance, token?.id)
                            )
                        : emDash}
                    </Text>
                  </Flex>
                  <Flex ml={'1'}>
                    <Text color={'gray.500'} lineHeight={'30px'}>
                      {token.symbol}
                    </Text>
                  </Flex>
                </Flex>
              </Skeleton>
            </Flex>
            {/* fiat balance */}
            <Flex
              alignItems={'end'}
              flex={'1'}
              flexDirection={'row'}
              justifyContent={'end'}
            >
              <Skeleton
                fadeDuration={0}
                isLoaded={!isLoading}
                minWidth={'200px'}
              >
                <Flex justifyContent={'end'}>
                  <Flex alignItems={'center'}>
                    <Text
                      color={'gray.500'}
                      fontSize={'xs'}
                      lineHeight={'12px'}
                    >
                      {Number(fiatBalance?.amount) > 0 ? '+' : ''}
                      <FiatAmount
                        amount={fiatBalance?.amount}
                        currencyTicker={spotPriceNativeToken?.currency}
                      />
                    </Text>
                  </Flex>
                  <Flex>
                    <ChangeIndicator change={change} size={'sm'} />
                  </Flex>
                </Flex>
              </Skeleton>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flex={'1'}
          flexDirection={'column'}
          height={'100%'}
          justifyContent={'end'}
          pt={isLoading ? '8' : '0'}
          onMouseLeave={handleChartMouseLeave}
        >
          <Skeleton
            fadeDuration={0}
            flex={'1'}
            isLoaded={!isLoading}
            pt={isLoading ? '0' : '24'}
          >
            <Flex flex={'1'} pb={'6'}>
              <Line data={data} height={'100%'} options={options} />
            </Flex>

            <Flex justifyContent={'space-between'} pb={'0.5'} pt={'1.5'}>
              <Flex>
                <Text color={'gray.400'} fontSize={'xs'}>
                  {start}
                </Text>
              </Flex>
              <Flex>
                <Text color={'gray.400'} fontSize={'xs'}>
                  {end}
                </Text>
              </Flex>
            </Flex>
          </Skeleton>
        </Flex>
      </Flex>
    </WidgetWrapper>
  );
};
