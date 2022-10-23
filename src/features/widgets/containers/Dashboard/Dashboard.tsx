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
import { useLatestBlock } from './hooks/useLatestBlock';

export const Dashboard: React.FC = () => {
  const address = useSelectActiveAccountAddress();
  const {
    importSettings,
    settingsFileInputRef,
    handleSettingsExport,
    handleSettingsImport,
  } = useSettings();
  const { latestBlock, countdown } = useLatestBlock();
  // const currency = useSelectCurrency();

  const handleCurrencyChange = (setCurrency: CurrencyTicker): void => {
    console.log('change currency', setCurrency);
    // dispatch({
    //   type: 'SET_CURRENCY',
    //   payload: setCurrency,
    // });
  };

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
        block={latestBlock?.data}
        // currency={currency}
        currency={{
          position: 'left',
          symbol: '$',
          ticker: 'USD',
        }}
        disableSettings={!address}
        // TODO: move countdown to a separate Navbar to avoid unnecessary re-renders with every countdown tick
        trigger={{
          countdown,
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
