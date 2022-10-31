import React, { useMemo } from 'react';
import { getToken } from '../../../../config/lib/helpers';
import { useActiveAccountBalanceHistorical } from '../../../chain/balances/hooks/useActiveAccountBalanceHistorical';
import { useActiveAccountBalanceLatest } from '../../../chain/balances/hooks/useActiveAccountBalanceLatest';
import { useSpotPriceFromTokenLatest } from '../../../chain/balances/hooks/useSpotPriceFromTokenLatest';
import { useFiatSpotPrice } from '../../../fiat/hooks/useFiatSpotPrice';
import { historicalPeriodToHours } from '../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';
import {
  TokenBalanceWidget as TokenBalanceWidgetComponent,
  TokenBalanceWidgetSettingsData,
  WidgetProps,
} from './../../components/TokenBalanceWidget/TokenBalanceWidget';

export const TokenBalanceWidget: React.FC<
  WidgetProps<TokenBalanceWidgetSettingsData>
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
  const balance = useActiveAccountBalanceLatest({
    tokenId: useMemo(() => token.id, [token]),
  });

  const hoursAgo = useMemo(
    () => historicalPeriodToHours(settings.historicalPeriod),
    [settings.historicalPeriod]
  );
  const historicalBalance = useActiveAccountBalanceHistorical({
    tokenId: useMemo(() => token.id, [token]),
    hoursAgo,
  });

  const fiatSpotPrice = useFiatSpotPrice();
  const spotPriceToken = useSpotPriceFromTokenLatest(token);

  const isLoading = useMemo(() => {
    return (
      balance.loading ||
      historicalBalance.loading ||
      fiatSpotPrice.loading ||
      spotPriceToken.loading
    );
  }, [balance, historicalBalance, fiatSpotPrice, spotPriceToken]);

  return (
    <TokenBalanceWidgetComponent
      balance={balance.balance?.data}
      currency={fiatSpotPrice.spotPrice?.data?.currency}
      historicalBalance={historicalBalance.balance?.data}
      isLoading={isLoading}
      settings={settings}
      spotPriceNativeToken={fiatSpotPrice.spotPrice?.data}
      spotPriceToken={spotPriceToken.spotPrice}
      token={token}
      onSettingsChange={onSettingsChange}
      onWidgetRemove={onWidgetRemove}
    />
  );
};
