import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from '@chakra-ui/react';
import { WidgetsLayout } from '../WidgetsLayout/WidgetsLayout';
import { TokenBalanceWidget } from './TokenBalanceWidget';

const token = {
  id: '0',
  fullName: 'Kolibri USD',
  ticker: 'kUSD',
};

const args = {
  balance: {
    token,
    amount: '0.005',
    fiatBalance: {
      amount: '100000',
    },
  },
  historicalBalance: {
    token,
    amount: '50000',
    fiatBalance: {
      amount: '50000',
    },
  },
  settings: {
    token: 'kUSD',
    historicalPeriod: '7d',
  },
  isLoading: false,
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  component: TokenBalanceWidget,
  args,
} as ComponentMeta<typeof TokenBalanceWidget>;

const Template: ComponentStory<typeof TokenBalanceWidget> = (args) => (
  <Flex width={'1280px'}>
    <WidgetsLayout
      layout={[
        {
          x: 0,
          y: 0,
          w: 3,
          h: 4,
          i: '0',
        },
      ]}
      widgets={[
        {
          id: '0',
          name: 'TokenBalanceWidget',
        },
      ]}
      onLayoutChange={console.log}
      onSettingsChange={console.log}
      onWidgetRemove={console.log}
    />
  </Flex>
);

export const Default = Template.bind({});
