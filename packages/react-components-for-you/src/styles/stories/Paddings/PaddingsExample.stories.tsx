import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PaddingsExample, PaddingSize } from './PaddingsExample';

export default {
  title: 'Styles/Paddings',
  component: PaddingsExample,
  argTypes: { size: { control: 'select' } },
} as ComponentMeta<typeof PaddingsExample>;

const Template: ComponentStory<typeof PaddingsExample> = (args) => (
  <PaddingsExample {...args} />
);

const TemplateAll: ComponentStory<typeof PaddingsExample> = (args) => (
  <>
    <PaddingsExample {...args} size={PaddingSize.EXTRA_SMALL} />
    <PaddingsExample {...args} size={PaddingSize.SMALL} />
    <PaddingsExample {...args} size={PaddingSize.MEDIUM} />
    <PaddingsExample {...args} size={PaddingSize.LARGE} />
    <PaddingsExample {...args} size={PaddingSize.EXTRA_LARGE} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  size: PaddingSize.EXTRA_SMALL,
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  size: PaddingSize.EXTRA_SMALL,
};

export const Small = Template.bind({});
Small.args = {
  size: PaddingSize.SMALL,
};

export const Medium = Template.bind({});
Medium.args = {
  size: PaddingSize.MEDIUM,
};

export const Large = Template.bind({});
Large.args = {
  size: PaddingSize.LARGE,
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: PaddingSize.EXTRA_LARGE,
};

export const All = TemplateAll.bind({});
All.args = {
  ...Default.args,
};
