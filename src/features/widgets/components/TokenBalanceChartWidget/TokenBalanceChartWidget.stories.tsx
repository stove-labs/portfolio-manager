import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from '@chakra-ui/react';
import { getToken } from '../../../../config/lib/helpers';
import { TokenBalanceChartWidget } from './TokenBalanceChartWidget';

const story: ComponentMeta<typeof TokenBalanceChartWidget> = {
  component: TokenBalanceChartWidget,
  args: {
    settings: {
      token: getToken('42290944933889').id,
      historicalPeriod: '30d',
    },
    token: getToken('42290944933889'),
    isLoading: false,
    latestBlock: {
      level: '10',
      // timestamp in ms
      timestamp: Date.now(),
    } as any,
    historicalBalances: [
      {
        data: {
          level: '1',
          amount: '1000000000000000000000',
        },
      },
      {
        data: {
          level: '2',
          amount: '2500000000000000000000',
        },
      },
      {
        data: {
          level: '3',
          amount: '3000000000000000000000',
        },
      },
      {
        data: {
          level: '4',
          amount: '4000000000000000000000',
        },
      },
      {
        data: {
          level: '5',
          amount: '5000000000000000000000',
        },
      },
      {
        data: {
          level: '6',
          amount: '4500000000000000000000',
        },
      },
      {
        data: {
          level: '7',
          amount: '3200000000000000000000',
        },
      },
      {
        data: {
          level: '8',
          amount: '2500000000000000000000',
        },
      },
      {
        data: {
          level: '9',
          amount: '1000000000000000000000',
        },
      },
      {
        data: {
          level: '10',
          amount: '4000000000000000000000',
        },
      },
    ] as any[],
    spotPriceNativeToken: {
      id: '1',
      level: '1',
      currency: 'USD',
      price: '1',
    },
    spotPriceToken: {
      id: '1',
      level: '1',
      currency: 'USD',
      price: '1',
    },
  },
};

export default story;

const Template: ComponentStory<typeof TokenBalanceChartWidget> = (args) => {
  return (
    <Flex m={'5'} maxHeight={'340px'} maxWidth={'600px'}>
      <TokenBalanceChartWidget {...args} />
    </Flex>
  );
};

export const Default = Template.bind({});
