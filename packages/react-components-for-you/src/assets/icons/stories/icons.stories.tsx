import { FC } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  ChevronLeft,
  ChevronRight,
  Close,
  Computer,
  DarkMode,
  Delete,
  Done,
  Edit,
  Error,
  ExpandLess,
  ExpandMore,
  Folder,
  Help,
  Info,
  Language,
  LightMode,
  MenuClosed,
  MenuOpen,
  NotificationsActive,
  NotificationsImportant,
  NotificationsInactive,
  PeopleGroup,
  PersonAdd,
  RadioButtonChecked,
  RadioButtonUnChecked,
  Refresh,
  Search,
  Settings,
  Shuffle,
  StadiaController,
  VisibilityOff,
  VisibilityOn,
  Warning,
} from '../index';

import { IconProps } from '../types';
import './iconsStories.scss';

import colors from '../../../styles/scss/colors.module.scss';

const IconStoryComponent: FC<IconProps> = (args: IconProps) => (
  <div
    className="icon-container"
    // eslint-disable-next-line react/destructuring-assignment
    style={{ width: `${args.size! * 9 + 8 * 8}px` }}
  >
    <ChevronLeft {...args} />
    <ChevronRight {...args} />
    <Close {...args} />
    <Computer {...args} />
    <DarkMode {...args} />
    <Delete {...args} />
    <Done {...args} />
    <Edit {...args} />
    <Error {...args} />
    <ExpandLess {...args} />
    <ExpandMore {...args} />
    <Folder {...args} />
    <Help {...args} />
    <Info {...args} />
    <Language {...args} />
    <LightMode {...args} />
    <MenuClosed {...args} />
    <MenuOpen {...args} />
    <NotificationsActive {...args} />
    <NotificationsImportant {...args} />
    <NotificationsInactive {...args} />
    <PeopleGroup {...args} />
    <PersonAdd {...args} />
    <RadioButtonChecked {...args} />
    <RadioButtonUnChecked {...args} />
    <Refresh {...args} />
    <Search {...args} />
    <Settings {...args} />
    <Shuffle {...args} />
    <StadiaController {...args} />
    <VisibilityOff {...args} />
    <VisibilityOn {...args} />
    <Warning {...args} />
  </div>
);

export default {
  title: 'Assets/Icons',
  component: IconStoryComponent,
  argTypes: {
    fill: {
      control: {
        type: 'color',
        presetColors: [
          ...Object.entries(colors).map((colorEntry) => ({
            color: colorEntry[1],
            title: colorEntry[0],
          })),
        ],
      },
      defaultValue: '#000000',
    },
    size: {
      control: { type: 'range', min: 16, max: 64, step: 8 },
    },
  },
} as ComponentMeta<typeof IconStoryComponent>;

const Template: ComponentStory<typeof IconStoryComponent> = (args) => (
  <IconStoryComponent {...args} />
);

export const AllIcons = Template.bind({});
