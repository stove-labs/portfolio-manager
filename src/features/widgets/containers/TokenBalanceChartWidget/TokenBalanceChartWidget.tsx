import React, { useMemo } from 'react';
import { getToken } from '../../../../config/lib/helpers';
import { useBalancesAtLevels } from '../../../chain/balances/hooks/useBalancesAtLevels';
import { useSpotPriceFromTokenLatest } from '../../../chain/balances/hooks/useSpotPriceFromTokenLatest';
import { Level } from '../../../chain/blocks/lib/blocks';
import {
  hoursToBlocksCount,
  useSelectLatestBlock,
} from '../../../chain/blocks/store/useBlocksSelectors';
import { useFiatSpotPrice } from '../../../fiat/hooks/useFiatSpotPrice';
import { useSelectActiveAccountAddress } from '../../../wallet/store/useWalletSelectors';
import { TokenBalanceChartWidgetSettingsData } from '../../components/TokenBalanceChartWidget/TokenBalanceChartWidget';
import { WidgetProps } from '../../components/TokenBalanceWidget/TokenBalanceWidget';
import { historicalPeriodToHours } from '../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';
import { TokenBalanceChartWidget as TokenBalanceChartWidgetComponent } from './../../components/TokenBalanceChartWidget/TokenBalanceChartWidget';

export const MAX_DATA_POINTS = '10';
export const TokenBalanceChartWidget: React.FC<
  WidgetProps<TokenBalanceChartWidgetSettingsData>
> = ({
  settings = {
    // TODO: rename token -> tokenId
    token: '42290944933889',
    historicalPeriod: '7d',
  },
  onWidgetRemove,
  onSettingsChange,
}) => {
  const token = getToken(settings.token);
  const address = useSelectActiveAccountAddress();
  const latestBlock = useSelectLatestBlock();

  const levels = useMemo<Level[]>(() => {
    if (!latestBlock?.data?.level) return [];

    const blocksInPeriod = hoursToBlocksCount(
      historicalPeriodToHours(settings.historicalPeriod)
    );
    const gap = Number(blocksInPeriod) / 10;
    const levels = Array.from(Array(10)).map((_, i) => {
      if (!latestBlock?.data?.level) return 0;
      // ensure the first historical level is the same as in other widgets
      if (i === 0)
        return Number(latestBlock.data.level) - Number(blocksInPeriod);
      // last level is always the current one
      if (i === 9) return latestBlock.data?.level;
      return Number(latestBlock.data.level) - gap * i;
    });

    return levels;
  }, [latestBlock, settings.historicalPeriod]);
  const balances = useBalancesAtLevels({
    address,
    tokenId: token.id,
    levels,
  });

  const fiatSpotPrice = useFiatSpotPrice();
  const spotPriceToken = useSpotPriceFromTokenLatest(token);

  const isLoading = useMemo(() => {
    return balances.loading || fiatSpotPrice.loading || spotPriceToken.loading;
  }, [balances, fiatSpotPrice, spotPriceToken]);

  return (
    <TokenBalanceChartWidgetComponent
      historicalBalances={balances.balances}
      isLoading={isLoading}
      latestBlock={latestBlock?.data}
      settings={settings}
      spotPriceNativeToken={fiatSpotPrice.spotPrice?.data}
      spotPriceToken={spotPriceToken.spotPrice}
      token={token}
      onSettingsChange={onSettingsChange}
      onWidgetRemove={onWidgetRemove}
    />
  );
};
