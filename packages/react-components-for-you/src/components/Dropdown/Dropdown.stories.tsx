import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Dropdown, DropdownProps } from './Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    onChange: { action: 'changed selected input' },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = ({
  selectedOptionId: initialSelectedOptionId,
  onChange,
  ...remainingProps
}: DropdownProps) => {
  const [selectedOptionId, setSelectedOptionId] = useState(
    initialSelectedOptionId,
  );

  useEffect(() => {
    setSelectedOptionId(initialSelectedOptionId);
  }, [initialSelectedOptionId]);

  return (
    <Dropdown
      {...remainingProps}
      onChange={(id, value) => {
        setSelectedOptionId(id);
        onChange(id, value);
      }}
      selectedOptionId={selectedOptionId}
      ref={undefined}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'dropdown-group-id',
  label: 'Test label',
  options: [
    { id: 'id-1', value: 'apple' },
    { id: 'id-2', value: 'banana' },
    { id: 'id-3', value: 'orange' },
  ],
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  ...Default.args,
  placeholderText: 'Please select a value',
};

export const WithPreSelectedValue = Template.bind({});
WithPreSelectedValue.args = {
  ...Default.args,
  selectedOptionId: 'id-2',
};

export const WthALongOptionList = Template.bind({});
WthALongOptionList.args = {
  ...Default.args,
  options: new Array(20).fill(0).map((_value, index) => ({
    id: index.toString(),
    value: `Value ${index.toString()}`,
  })),
};
