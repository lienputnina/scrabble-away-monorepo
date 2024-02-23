import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TypographyExample } from './TypographyExample';

export default {
  title: 'Styles/Typography',
  component: TypographyExample,
} as ComponentMeta<typeof TypographyExample>;

const Template: ComponentStory<typeof TypographyExample> = (args) => (
  <TypographyExample {...args} />
);

export const Typography = Template.bind({});
Typography.args = {};
