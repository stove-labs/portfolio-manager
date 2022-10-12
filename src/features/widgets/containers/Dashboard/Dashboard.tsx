import React from 'react';
import { WidgetsLayout } from '../WidgetsLayout/WidgetsLayout';
import { Dashboard as DashboardComponent } from '../../components/Dashboard/Dashboard';

export const Dashboard: React.FC = () => {
  return (
    <DashboardComponent>
      <WidgetsLayout
        layout={[
          {
            x: 0,
            y: 0,
            w: 4,
            h: 4,
            i: '0',
          },
          {
            x: 4,
            y: 0,
            w: 4,
            h: 4,
            i: '1',
          },
        ]}
        widgets={[
          {
            id: '0',
            name: 'TokenBalanceWidget',
          },
          {
            id: '1',
            name: 'TokenBalanceWidget',
          },
        ]}
        onLayoutChange={console.log}
        onSettingsChange={console.log}
        onWidgetRemove={console.log}
      />
    </DashboardComponent>
  );
};
