import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from '@chakra-ui/react';
import {
  TokenBalanceWidget,
  TokenBalanceWidgetProps,
  TokenBalanceWidgetSettingsData,
  WidgetProps,
} from '../TokenBalanceWidget/TokenBalanceWidget';
import { Default as TokenBalanceWidgetStory } from '../TokenBalanceWidget/TokenBalanceWidget.stories';
import { WidgetName, WidgetsLayout } from './WidgetsLayout';

const layout = [
  {
    x: 0,
    y: 0,
    w: 4,
    h: 3,
    i: '0',
  },
  {
    x: 4,
    y: 0,
    w: 4,
    h: 3,
    i: '1',
  },
  {
    x: 8,
    y: 0,
    w: 4,
    h: 3,
    i: '2',
  },
  {
    x: 0,
    y: 3,
    w: 8,
    h: 6,
    i: '3',
  },
  {
    x: 0,
    y: 9,
    w: 12,
    h: 9,
    i: '4',
  },
];

const TokenBalanceWidgetDummyContainer: ComponentStory<
  React.FC<
    TokenBalanceWidgetProps & WidgetProps<TokenBalanceWidgetSettingsData>
  >
> = () => {
  return (
    <TokenBalanceWidget
      {...TokenBalanceWidgetStory.args}
      currency={'USD'}
      isLoading={false}
      onSettingsChange={console.log}
      onWidgetRemove={console.log}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  component: WidgetsLayout,
  args: {
    widgets: [
      {
        name: 'TokenBalanceWidget',
        id: '0',
        settings: {
          token: '0',
          historicalPeriod: '30d',
        },
      },
      {
        name: 'TokenBalanceWidget',
        id: '1',
        settings: {
          token: '42290944933889',
          historicalPeriod: '7d',
        },
      },
      {
        name: 'TokenBalanceWidget',
        id: '2',
        settings: {
          token: '74079757402113',
          historicalPeriod: '24d',
        },
      },
      {
        name: 'TokenBalanceWidget',
        id: '3',
        settings: {
          token: '42290944933889',
          historicalPeriod: '30d',
        },
      },
      {
        name: 'TokenBalanceWidget',
        id: '4',
        settings: {
          token: '42290944933889',
          historicalPeriod: '30d',
        },
      },
    ],
    layout,
    onLayoutChange: console.log,
    onSettingsChange: console.log,
    onWidgetRemove: console.log,
    widgetAs: (name: WidgetName) => TokenBalanceWidgetDummyContainer,
  },
} as unknown as ComponentMeta<typeof WidgetsLayout>;

const Template: ComponentStory<typeof WidgetsLayout> = (args) => (
  <Flex width={'1280px'}>
    <WidgetsLayout {...args} />
  </Flex>
);

export const Default = Template.bind({});
Default.args = {};
