import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Counter } from './Counter';

// TODO: use storybook eslint rules for .stories.tsx to allow default exports
// eslint-disable-next-line
export default {
  component: Counter,
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = (args) => (
  <Counter {...args} />
);

export const Default = Template.bind({});
Default.args = {
  count: 0,
};
