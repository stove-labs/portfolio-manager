import React, { useMemo } from 'react';
import { HistoricalPeriod } from '../../../widgets/components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';
import { AutoComplete } from '../AutoComplete/AutoComplete';

export interface HistoricalPeriodSelectorProps {
  historicalPeriods: HistoricalPeriod[];
}

export const HistoricalPeriodSelector: React.FC<
  HistoricalPeriodSelectorProps
> = ({ historicalPeriods }) => {
  const options = useMemo(
    () =>
      historicalPeriods.map((historicalPeriod) => ({
        label: historicalPeriod,
        value: historicalPeriod,
      })),
    [historicalPeriods]
  );
  return <AutoComplete label={'Historical period'} options={options} />;
};
