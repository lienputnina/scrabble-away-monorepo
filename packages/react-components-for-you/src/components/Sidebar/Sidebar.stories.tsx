import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Sidebar, SidebarPosition, SidebarProps } from './Sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    width: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof Sidebar>;

const SidebarTemplate: ComponentStory<typeof Sidebar> = ({
  onOpenButtonClick,
  onCloseButtonClick,
  isOpen: initialIsOpen,
  ...remainingProps
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  return (
    <Sidebar
      isOpen={isOpen}
      onOpenButtonClick={() => {
        setIsOpen(!isOpen);
        onOpenButtonClick();
      }}
      onCloseButtonClick={() => {
        setIsOpen(!isOpen);
        onCloseButtonClick();
      }}
      {...remainingProps}
    />
  );
};

export const Default = SidebarTemplate.bind({});
Default.args = {
  title: 'Sidebar Title',
  children: 'Children',
};

export const Open = SidebarTemplate.bind({});
Open.args = {
  ...Default.args,
  isOpen: true,
};

export const Closed = SidebarTemplate.bind({});
Closed.args = {
  ...Default.args,
  isOpen: false,
};

export const LeftPosition = SidebarTemplate.bind({});
LeftPosition.args = {
  ...Default.args,
  position: SidebarPosition.LEFT,
};

export const RightPosition = SidebarTemplate.bind({});
RightPosition.args = {
  ...Default.args,
  position: SidebarPosition.RIGHT,
};
