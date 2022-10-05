import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from '@chakra-ui/react';
import { WidgetsLayout } from '../WidgetsLayout/WidgetsLayout';
import { TokenBalanceWidget } from './TokenBalanceWidget';

const token = {
  fullName: 'Kolibri USD',
  ticker: 'kUSD',
};

const args = {
  balance: {
    amount: '5368',
    token,
    fiatBalance: {
      amount: '100000',
    },
  },
  historicalBalance: {
    amount: '50000',
    token,
    fiatBalance: {
      amount: '50000',
    },
  },
  isLoading: false,
};

// eslint-disable-next-line
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
          name: 'TokenBalanceWidget',
          settings: args,
        },
      ]}
      onLayoutChange={console.log}
    />
  </Flex>
);

export const Default = Template.bind({});
