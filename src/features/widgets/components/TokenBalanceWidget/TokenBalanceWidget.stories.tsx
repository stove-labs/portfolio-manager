import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Box } from '@chakra-ui/react';
import { TokenBalanceWidget } from './TokenBalanceWidget';

const token = {
  fullName: 'Kolibri USD',
  ticker: 'kUSD',
};

// eslint-disable-next-line
export default {
  component: TokenBalanceWidget,
  args: {
    balance: {
      amount: '100000',
      token,
      usdBalance: {
        amount: '100000',
      },
    },
    token,
    historicalBalance: {
      amount: '50000',
      token,
      usdBalance: {
        amount: '50000',
      },
    },
    isLoading: false,
  },
} as ComponentMeta<typeof TokenBalanceWidget>;

const Template: ComponentStory<typeof TokenBalanceWidget> = (args) => (
  <Box width={'1280px'}>
    <TokenBalanceWidget {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {};
