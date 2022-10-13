import React, { useCallback, useMemo, useRef } from 'react';
// import { WidgetsLayout } from '../WidgetsLayout/WidgetsLayout';
import { Input, UseDisclosureReturn } from '@chakra-ui/react';
import { Dashboard as DashboardComponent } from '../../components/Dashboard/Dashboard';
import { useStoreContext } from '../../../../store/useStore';
import { WidgetsLayoutState } from '../WidgetsLayout/store/useWidgetsLayoutStore';
import { Settings } from '../Settings/Settings';
import { ActiveAccount } from '../../../Wallet/containers/ActiveAccount';

export const Dashboard: React.FC = () => {
  // TODO add selectors
  const [state, dispatch] = useStoreContext();
  const settings = useMemo(() => state.settings, [state]);
  const address = useMemo(() => state.wallet.activeAccount?.address, [state]);

  // ref to the hidden file input element
  const settingsFileInput = useRef<HTMLInputElement>(null);

  // saves a file with the current widget settings including widget layout
  const handleSettingsExport = useCallback((): void => {
    if (!address) return;
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(settings)], {
      type: 'text/plain',
    });
    a.href = URL.createObjectURL(file);
    a.download = `${address}-portfolio-dashboard-settings.json`;
    a.click();
  }, [settings, address]);

  // imports layout/widget settings from a JSON file uploaded by the user
  const importSettings = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files?.[0]) {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], 'UTF-8');
        fileReader.onload = (e) => {
          const data = JSON.parse(
            e.target?.result?.toString() ?? ''
          ) as WidgetsLayoutState;
          if (!('widgets' in data && 'layout' in data)) return;

          if (data) {
            dispatch({
              type: 'SET_LAYOUT',
              payload: { layout: data.layout, widgets: data.widgets },
            });
          }
        };
      }
    },
    []
  );

  // trigger file input on a hidden settings file input
  const handleSettingsImport = useCallback(() => {
    settingsFileInput.current?.click();
  }, [settingsFileInput]);

  return (
    <>
      <Input
        ref={settingsFileInput}
        display={'none'}
        type={'file'}
        onChange={(e) => importSettings(e)}
      ></Input>
      <DashboardComponent
        activeAccountAs={() => <ActiveAccount />}
        addWidgetAs={(disclosure: UseDisclosureReturn) => (
          <Settings {...disclosure} />
        )}
        block={{
          level: '1234567',
          // red
          // timestamp: Date.now() - 120000,
          // yellow
          // timestamp: Date.now() - 80000,
          // green
          timestamp: Date.now() - 30000,
        }}
        trigger={{
          countdown: 30000,
        }}
        onSettingsExport={handleSettingsExport}
        onSettingsImport={handleSettingsImport}
      >
        {/* <WidgetsLayout
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
      /> */}
      </DashboardComponent>
    </>
  );
};
