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
    id: '2811282-tz1PWtaLXKiHXhXGvpuS8w4sVveNRKedTRSe-42290944933889',
    amount: '8301499866970042441',
  },
  historicalBalance: {
    id: '2831431-tz1PWtaLXKiHXhXGvpuS8w4sVveNRKedTRSe-0',
    amount: '7772556086664946654',
  },
  isLoading: false,
  currency: 'USD',
  spotPriceToken: {
    id: '42290944933889-USD-2831442',
    level: '2831442',
    currency: 'USD',
    price: '0.719517',
  },
  spotPriceTokenHistorical: {
    id: '42290944933889-USD-2811282',
    level: '2811282',
    currency: 'USD',
    price: '0.709517',
  },
  spotPriceNativeToken: {
    id: '0-USD-2831442',
    level: '2831442',
    currency: 'USD',
    price: '1.433',
  },
  spotPriceNativeTokenHistorical: {
    id: '0-USD-2831442',
    level: '2831442',
    currency: 'USD',
    price: '1.233',
  },
  settings: {
    token: '42290944933889',
    historicalPeriod: '7d',
  },
};
