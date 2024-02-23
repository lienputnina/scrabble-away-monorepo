import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Title, TitleLevel, TitleAlignment } from './Title';

export default {
  title: 'Components/Title',
  component: Title,
  argTypes: { level: { control: 'select' }, alignment: { control: 'select' } },
} as ComponentMeta<typeof Title>;

const SingleTitle: ComponentStory<typeof Title> = (args) => <Title {...args} />;
const AllTitles: ComponentStory<typeof Title> = (args) => (
  <>
    <Title {...args} level={TitleLevel.ONE} />
    <Title {...args} level={TitleLevel.TWO} />
    <Title {...args} level={TitleLevel.THREE} />
    <Title {...args} level={TitleLevel.FOUR} />
  </>
);

const TitleAlignments: ComponentStory<typeof Title> = (args) => (
  <>
    <Title {...args} alignment={TitleAlignment.LEFT} />
    <Title {...args} alignment={TitleAlignment.RIGHT} />
    <Title {...args} alignment={TitleAlignment.CENTER} />
  </>
);

export const Default = SingleTitle.bind({});
Default.args = {
  children: 'Title text',
};

export const LevelOne = SingleTitle.bind({});
LevelOne.args = {
  ...Default.args,
  level: TitleLevel.ONE,
};

export const LevelTwo = SingleTitle.bind({});
LevelTwo.args = {
  ...Default.args,
  level: TitleLevel.TWO,
};

export const LevelThree = SingleTitle.bind({});
LevelThree.args = {
  ...Default.args,
  level: TitleLevel.THREE,
};

export const LevelFour = SingleTitle.bind({});
LevelFour.args = {
  ...Default.args,
  level: TitleLevel.FOUR,
};

export const AllLevels = AllTitles.bind({});
AllLevels.args = {
  ...Default.args,
};

export const LeftAlignment = SingleTitle.bind({});
LeftAlignment.args = {
  ...Default.args,
  alignment: TitleAlignment.LEFT,
};

export const RightAlignment = SingleTitle.bind({});
RightAlignment.args = {
  ...Default.args,
  alignment: TitleAlignment.RIGHT,
};

export const CenterAlignment = SingleTitle.bind({});
CenterAlignment.args = {
  ...Default.args,
  alignment: TitleAlignment.CENTER,
};

export const AllAlignments = TitleAlignments.bind({});
AllAlignments.args = {
  ...Default.args,
};
