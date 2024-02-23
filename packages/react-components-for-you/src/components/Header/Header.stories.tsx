import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Title, TitleLevel } from '../Title/Title';
import { Header } from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithLogoUrl = Template.bind({});
WithLogoUrl.args = {
  ...Default.args,
  logoUrl: 'https://www.google.com/',
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  ...Default.args,
  children: (
    <Title style={{ margin: '0' }} level={TitleLevel.FOUR}>
      Title text
    </Title>
  ),
};

export const WithCustomLogo = Template.bind({});
WithCustomLogo.args = {
  ...Default.args,
  customLogo: <button type="button">LOGO</button>,
};
