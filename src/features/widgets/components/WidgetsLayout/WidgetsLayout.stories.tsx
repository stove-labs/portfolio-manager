import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from '@chakra-ui/react';
import { Default as TokenBalanceWidgetDefault } from '../TokenBalanceWidget/TokenBalanceWidget.stories';
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
    y: 5,
    w: 8,
    h: 10,
    i: '3',
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
