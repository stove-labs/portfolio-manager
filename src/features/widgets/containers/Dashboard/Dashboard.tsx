import React, { useCallback, useMemo, useRef } from 'react';
// import { WidgetsLayout } from '../WidgetsLayout/WidgetsLayout';
import { Input, UseDisclosureReturn } from '@chakra-ui/react';
import { Dashboard as DashboardComponent } from '../../components/Dashboard/Dashboard';
import { useStoreContext } from '../../../../store/useStore';
import { WidgetsLayoutState } from '../WidgetsLayout/store/useWidgetsLayoutStore';
import { WidgetStore } from '../WidgetStore/WidgetStore';
// import { ActiveAccount } from '../../../Wallet/containers/ActiveAccount';
import { WidgetsLayout } from '../WidgetsLayout/WidgetsLayout';
import { ActiveAccount } from '../../../wallet/containers/ActiveAccount';
// import { useSelectCurrentBlock } from '../../store/selectors/chain/useChainSelectors';
// import { useSelectCurrency } from '../../store/selectors/spotPrice/useSpotPriceSelectors';
import { CurrencyTicker } from '../../../../config/config/currencies';

export const Dashboard: React.FC = () => {
  // TODO add selectors
  const [state, dispatch] = useStoreContext();
  const settings = useMemo(() => state.settings, [state]);
  const address = useMemo(() => state.wallet.activeAccount?.address, [state]);
  // const currency = useSelectCurrency();
  // const block = useSelectCurrentBlock();
  // const [timer, setTimer] = useState(30 * 1000);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!block?.level) return;
  //     setTimer(timer <= 0 ? 30 * 1000 : timer - 1000);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [block?.level, timer]);

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

  const handleCurrencyChange = (setCurrency: CurrencyTicker): void => {
    console.log('change currency', setCurrency);
    // dispatch({
    //   type: 'SET_CURRENCY',
    //   payload: setCurrency,
    // });
  };

  // useEffect(() => {
  //   if (!(timer === 30 * 1000)) return;
  //   dispatch({
  //     type: 'LOAD_LATEST_BLOCK',
  //   });
  // }, [timer]);

  // useEffect(() => {
  //   dispatch({
  //     type: 'LOAD_SPOT_PRICE',
  //     payload: { ids: ['0'], currency: currency.ticker },
  //   });
  // }, [block?.level, currency.ticker]);

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
          <WidgetStore {...disclosure} />
        )}
        // block={{
        //   level: block?.level ?? '-',
        //   // red
        //   // timestamp: Date.now() - 120000,
        //   // yellow
        //   // timestamp: Date.now() - 80000,
        //   // green
        //   timestamp: new Date(block?.timestamp ?? '').getTime(),
        // }}
        block={{
          level: '1',
          timestamp: Date.now(),
        }}
        // currency={currency}
        currency={{
          position: 'left',
          symbol: '$',
          ticker: 'USD',
        }}
        disableSettings={!address}
        trigger={{
          countdown: timer,
        }}
        onCurrencyChange={handleCurrencyChange}
        onSettingsExport={handleSettingsExport}
        onSettingsImport={handleSettingsImport}
      >
        {address ? <WidgetsLayout /> : undefined}
      </DashboardComponent>
    </>
  );
};
