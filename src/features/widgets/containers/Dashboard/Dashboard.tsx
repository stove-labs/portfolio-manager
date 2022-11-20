import React from 'react';
// import { WidgetsLayout } from '../WidgetsLayout/WidgetsLayout';
import { Input, UseDisclosureReturn } from '@chakra-ui/react';
import { Dashboard as DashboardComponent } from '../../components/Dashboard/Dashboard';
import { WidgetStore } from '../WidgetStore/WidgetStore';
import { WidgetsLayout } from '../WidgetsLayout/WidgetsLayout';
import { ActiveAccount } from '../../../wallet/containers/ActiveAccount';
import {
  CurrencyTicker,
  currencies,
} from '../../../../config/config/currencies';
import { useSelectActiveAccountAddress } from '../../../wallet/store/useWalletSelectors';
import { useStoreContext } from '../../../../store/useStore';
import { setCurrency } from '../../../fiat/store/useFiatActions';
import { useSelectCurrency } from '../../../fiat/store/useFiatSelectors';
import { useLatestBlock } from './hooks/useLatestBlock';
import { useSettings } from './hooks/useSettings';

export const Dashboard: React.FC = () => {
  const address = useSelectActiveAccountAddress();
  const currency = useSelectCurrency();
  const {
    importSettings,
    settingsFileInputRef,
    handleSettingsExport,
    handleSettingsImport,
  } = useSettings();
  const { latestBlock, countdown } = useLatestBlock();
  const [, dispatch] = useStoreContext();
  const handleCurrencyChange = (currency: CurrencyTicker): void => {
    dispatch(setCurrency(currency));
  };

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
        // TODO: improve currency selector to return full currency, not just the ticker
        currency={currencies[currency]}
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
