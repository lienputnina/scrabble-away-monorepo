import { useEffect, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RadioInput, RadioInputProps } from './RadioInput';

export default {
  title: 'Components/RadioButtonGroup/RadioButton',
  component: RadioInput,
} as ComponentMeta<typeof RadioInput>;

const Template: ComponentStory<typeof RadioInput> = ({
  isChecked: initialIsChecked,
  onChange,
  ...remainingProps
}: RadioInputProps) => {
  const [isChecked, setIsChecked] = useState(initialIsChecked);

  useEffect(() => {
    setIsChecked(initialIsChecked);
  }, [initialIsChecked]);

  return (
    <RadioInput
      {...remainingProps}
      onChange={(id, value) => {
        setIsChecked(!isChecked);
        onChange(id, value);
      }}
      isChecked={isChecked}
      ref={undefined}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  groupId: 'group-id',
  optionId: 'option-id',
  label: 'Test label',
  value: 'Test value',
};

export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  isChecked: true,
};
