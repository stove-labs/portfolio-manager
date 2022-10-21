import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from '@chakra-ui/react';
import { TokenBalanceWidget } from './TokenBalanceWidget';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  component: TokenBalanceWidget,
} as ComponentMeta<typeof TokenBalanceWidget>;

const Template: ComponentStory<typeof TokenBalanceWidget> = (args) => {
  return (
    <Flex width={'1280px'}>
      <TokenBalanceWidget {...args} />
    </Flex>
  );
};

export const Default = Template.bind({});
Default.args = {
  token: {
    id: '42290944933889',
    name: 'Kolibri USD',
    symbol: 'kUSD',
    contract: {
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
    },
    metadata: {
      decimals: '18',
    },
    pool: {
      address: 'KT1K4EwTpbvYN9agJdjpyJm4ZZdhpUNKB3F6',
    },
  },
  balance: {
    amount: '0.005',
    fiatBalance: {
      amount: '100000',
    },
  },
  historicalBalance: {
    amount: '50000',
    fiatBalance: {
      amount: '50000',
    },
  },
  isLoading: false,
  currency: 'USD',
  spotPriceToken: '0.768',
  spotPriceNativeToken: '1.354',
  settings: {
    token: '42290944933889',
    historicalPeriod: '30d',
  },
};
