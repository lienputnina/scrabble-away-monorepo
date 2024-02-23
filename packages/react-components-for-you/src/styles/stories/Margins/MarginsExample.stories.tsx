import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MarginsExample, MarginSize } from './MarginsExample';

export default {
  title: 'Styles/Margins',
  component: MarginsExample,
  argTypes: { size: { control: 'select' } },
} as ComponentMeta<typeof MarginsExample>;

const Template: ComponentStory<typeof MarginsExample> = (args) => (
  <MarginsExample {...args} />
);

const TemplateAll: ComponentStory<typeof MarginsExample> = (args) => (
  <>
    <MarginsExample {...args} size={MarginSize.EXTRA_SMALL} />
    <MarginsExample {...args} size={MarginSize.SMALL} />
    <MarginsExample {...args} size={MarginSize.MEDIUM} />
    <MarginsExample {...args} size={MarginSize.LARGE} />
    <MarginsExample {...args} size={MarginSize.EXTRA_LARGE} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  size: MarginSize.EXTRA_SMALL,
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  size: MarginSize.EXTRA_SMALL,
};

export const Small = Template.bind({});
Small.args = {
  size: MarginSize.SMALL,
};

export const Medium = Template.bind({});
Medium.args = {
  size: MarginSize.MEDIUM,
};

export const Large = Template.bind({});
Large.args = {
  size: MarginSize.LARGE,
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: MarginSize.EXTRA_LARGE,
};

export const All = TemplateAll.bind({});
All.args = {
  ...Default.args,
};
