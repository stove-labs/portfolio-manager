import React from 'react';
// import { WidgetsLayout } from '../WidgetsLayout/WidgetsLayout';
import { Input, UseDisclosureReturn } from '@chakra-ui/react';
import { Dashboard as DashboardComponent } from '../../components/Dashboard/Dashboard';
import { WidgetStore } from '../WidgetStore/WidgetStore';
// import { ActiveAccount } from '../../../Wallet/containers/ActiveAccount';
import { WidgetsLayout } from '../WidgetsLayout/WidgetsLayout';
import { ActiveAccount } from '../../../wallet/containers/ActiveAccount';
// import { useSelectCurrentBlock } from '../../store/selectors/chain/useChainSelectors';
// import { useSelectCurrency } from '../../store/selectors/spotPrice/useSpotPriceSelectors';
import { CurrencyTicker } from '../../../../config/config/currencies';
import { useSelectActiveAccountAddress } from '../../../wallet/store/useWalletSelectors';
import { useSettings } from './hooks/useSettings';

export const Dashboard: React.FC = () => {
  const address = useSelectActiveAccountAddress();
  const {
    importSettings,
    settingsFileInputRef,
    handleSettingsExport,
    handleSettingsImport,
  } = useSettings();
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
        ref={settingsFileInputRef}
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
          // countdown: timer,
          countdown: 0,
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
