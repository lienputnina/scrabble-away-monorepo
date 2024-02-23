import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Text, TextStyle, TextAlignment } from './Text';

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    textStyle: { control: 'select' },
    alignment: { control: 'select' },
  },
} as ComponentMeta<typeof Text>;

const SingleText: ComponentStory<typeof Text> = (args) => <Text {...args} />;
const AllTexts: ComponentStory<typeof Text> = (args) => (
  <>
    <Text {...args} textStyle={TextStyle.REGULAR} />
    <Text {...args} textStyle={TextStyle.BOLD} />
    <Text {...args} textStyle={TextStyle.ITALIC} />
  </>
);

const TextAlignments: ComponentStory<typeof Text> = (args) => (
  <>
    <Text {...args} alignment={TextAlignment.LEFT} />
    <Text {...args} alignment={TextAlignment.RIGHT} />
    <Text {...args} alignment={TextAlignment.CENTER} />
  </>
);

export const Default = SingleText.bind({});
Default.args = {
  children: 'Test text, see more next',
};

export const StyleRegular = SingleText.bind({});
StyleRegular.args = {
  ...Default.args,
  textStyle: TextStyle.REGULAR,
};

export const StyleBold = SingleText.bind({});
StyleBold.args = {
  ...Default.args,
  textStyle: TextStyle.BOLD,
};

export const StyleItalic = SingleText.bind({});
StyleItalic.args = {
  ...Default.args,
  textStyle: TextStyle.ITALIC,
};

export const AllStyles = AllTexts.bind({});
AllStyles.args = {
  ...Default.args,
};

export const LeftAlignment = SingleText.bind({});
LeftAlignment.args = {
  ...Default.args,
  alignment: TextAlignment.LEFT,
};

export const RightAlignment = SingleText.bind({});
RightAlignment.args = {
  ...Default.args,
  alignment: TextAlignment.RIGHT,
};

export const CenterAlignment = SingleText.bind({});
CenterAlignment.args = {
  ...Default.args,
  alignment: TextAlignment.CENTER,
};

export const AllAlignments = TextAlignments.bind({});
AllAlignments.args = {
  ...Default.args,
};
