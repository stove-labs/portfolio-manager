import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from '@chakra-ui/react';
import TokenBalanceWidgetDefault from '../TokenBalanceWidget/TokenBalanceWidget.stories';
import { WidgetsLayout } from './WidgetsLayout';

const layout = [
  {
    x: 0,
    y: 0,
    w: 3,
    h: 4,
    i: '0',
  },
  {
    x: 3,
    y: 0,
    w: 3,
    h: 4,
    i: '1',
  },
  {
    x: 6,
    y: 0,
    w: 3,
    h: 4,
    i: '2',
  },
  {
    x: 0,
    y: 4,
    w: 6,
    h: 8,
    i: '3',
  },
  {
    x: 0,
    y: 12,
    w: 9,
    h: 12,
    i: '4',
  },
];

// eslint-disable-next-line
export default {
  component: WidgetsLayout,
  args: {
    widgets: [
      {
        name: 'TokenBalanceWidget',
        settings: TokenBalanceWidgetDefault.args,
      },
      {
        name: 'TokenBalanceWidget',
        settings: TokenBalanceWidgetDefault.args,
      },
      {
        name: 'TokenBalanceWidget',
        settings: TokenBalanceWidgetDefault.args,
      },
      {
        name: 'TokenBalanceWidget',
        settings: TokenBalanceWidgetDefault.args,
      },
      {
        name: 'TokenBalanceWidget',
        settings: TokenBalanceWidgetDefault.args,
      },
    ],
    layout,
  },
} as ComponentMeta<typeof WidgetsLayout>;

const Template: ComponentStory<typeof WidgetsLayout> = (args) => (
  <Flex width={'1280px'}>
    <WidgetsLayout {...args} />
  </Flex>
);

export const Default = Template.bind({});
Default.args = {};
