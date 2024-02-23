import { useEffect, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RadioInputGroup, RadioInputGroupProps } from './RadioInputGroup';

export default {
  title: 'Components/RadioButtonGroup',
  component: RadioInputGroup,
  argTypes: {
    onChange: { action: 'changed checked input' },
  },
} as ComponentMeta<typeof RadioInputGroup>;

const TemplateSingle: ComponentStory<typeof RadioInputGroup> = ({
  checkedOptionId: initialCheckedOptionId,
  onChange,
  ...remainingProps
}: RadioInputGroupProps) => {
  const [checkedOptionId, setCheckedOptionId] = useState(
    initialCheckedOptionId,
  );

  useEffect(() => {
    setCheckedOptionId(initialCheckedOptionId);
  }, [initialCheckedOptionId]);

  return (
    <RadioInputGroup
      {...remainingProps}
      onChange={(id, value) => {
        setCheckedOptionId(id);
        onChange(id, value);
      }}
      checkedOptionId={checkedOptionId}
    />
  );
};

export const Default = TemplateSingle.bind({});
Default.args = {
  id: 'radio-group-id',
  label: 'Test label',
  options: [
    { id: 'id-1', value: 'value-1', label: 'label-1' },
    { id: 'id-2', value: 'value-2', label: 'label-2' },
    { id: 'id-3', value: 'value-3', label: 'label-3' },
  ],
  checkedOptionId: 'id-2',
};
