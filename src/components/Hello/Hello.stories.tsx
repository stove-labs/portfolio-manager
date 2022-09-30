import { Hello } from './Hello';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: Hello,
} as ComponentMeta<typeof Hello>;

const Template: ComponentStory<typeof Hello> = (args) => <Hello {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'World',
};
