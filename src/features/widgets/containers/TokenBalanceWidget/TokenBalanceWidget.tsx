import React, { useMemo } from 'react';
import { getToken } from '../../../../config/lib/helpers';
import { useActiveAccountBalanceHistorical } from '../../../chain/balances/hooks/useActiveAccountBalanceHistorical';
import { useActiveAccountBalanceLatest } from '../../../chain/balances/hooks/useActiveAccountBalanceLatest';
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
  const currency = 'USD';
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

  const spotPriceNativeToken = '1';
  const spotPriceToken = '1';

  const isLoading = useMemo(() => {
    return balance.loading || historicalBalance.loading;
  }, [balance, historicalBalance]);

  return (
    <TokenBalanceWidgetComponent
      balance={balance.balance?.data}
      currency={currency}
      fiatBalance={balance.balance?.data}
      historicalBalance={historicalBalance.balance?.data}
      historicalFiatBalance={historicalBalance.balance?.data}
      isLoading={isLoading}
      settings={settings}
      spotPriceNativeToken={spotPriceNativeToken}
      spotPriceToken={spotPriceToken}
      token={token}
      onSettingsChange={onSettingsChange}
      onWidgetRemove={onWidgetRemove}
    />
  );
};
