import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { UseDisclosureReturn } from '@chakra-ui/react';
import { currencies } from '../../../../config/config/currencies';
import { ActiveAccount } from '../../../Wallet/components/ActiveAccount/ActiveAccount';
import { WidgetStore } from '../WidgetStore/WidgetStore';
import { Dashboard } from './Dashboard';

// TODO: use storybook eslint rules for .stories.tsx to allow default exports
// eslint-disable-next-line
export default {
  component: Dashboard,
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = (args) => {
  return <Dashboard {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  onSettingsExport: console.log,
  onSettingsImport: console.log,
  onCurrencyChange: console.log,
  disableSettings: true,
  currency: currencies.USD,
  block: {
    level: '1234567',
    timestamp: 1666345470903,
  },
  trigger: {
    countdown: 20000,
  },
  addWidgetAs: (disclosure: UseDisclosureReturn) => (
    <WidgetStore
      availableWidgets={[]}
      onAddWidget={console.log}
      {...disclosure}
    />
  ),
  activeAccountAs: () => (
    <ActiveAccount
      {...{
        activeAccount: { address: 'tz1PWtaLXKiHXhXGvpuS8w4sVveNRKedTRSe' },
        onConnectWallet: console.log,
        onDisconnectWallet: console.log,
      }}
    />
  ),
};
