import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dashboard } from './Dashboard';

// TODO: use storybook eslint rules for .stories.tsx to allow default exports
// eslint-disable-next-line
export default {
  component: Dashboard,
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = (args) => (
  <Dashboard {...args} />
);

export const Default = Template.bind({});
