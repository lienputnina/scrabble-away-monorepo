import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ElevationsExample, ElevationLevel } from './ElevationsExample';

export default {
  title: 'Styles/Elevations',
  component: ElevationsExample,
  argTypes: { level: { control: 'select' } },
} as ComponentMeta<typeof ElevationsExample>;

const TemplateSingle: ComponentStory<typeof ElevationsExample> = (args) => (
  <ElevationsExample {...args} />
);

const TemplateAll: ComponentStory<typeof ElevationsExample> = (args) => (
  <>
    <ElevationsExample {...args} level={ElevationLevel.ONE} />
    <ElevationsExample {...args} level={ElevationLevel.TWO} />
    <ElevationsExample {...args} level={ElevationLevel.THREE} />
    <ElevationsExample {...args} level={ElevationLevel.FOUR} />
  </>
);

export const Default = TemplateSingle.bind({});
Default.args = {
  level: ElevationLevel.ONE,
};

export const LevelOne = TemplateSingle.bind({});
LevelOne.args = {
  level: ElevationLevel.ONE,
};

export const LevelTwo = TemplateSingle.bind({});
LevelTwo.args = {
  level: ElevationLevel.TWO,
};

export const LevelThree = TemplateSingle.bind({});
LevelThree.args = {
  level: ElevationLevel.THREE,
};

export const LevelFour = TemplateSingle.bind({});
LevelFour.args = {
  level: ElevationLevel.FOUR,
};

export const All = TemplateAll.bind({});
All.args = {
  ...Default.args,
};
