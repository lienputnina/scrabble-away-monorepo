import { useEffect, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NumberInput, NumberInputProps } from './NumberInput';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  argTypes: {
    onChange: { action: 'changed input value' },
  },
} as ComponentMeta<typeof NumberInput>;

const TemplateInput: ComponentStory<typeof NumberInput> = ({
  onChange,
  value: initialValue,
  ...remainingProps
}: NumberInputProps) => {
  const [enteredValue, setEnteredValue] = useState(initialValue);

  useEffect(() => {
    setEnteredValue(initialValue);
  }, [initialValue]);

  return (
    <NumberInput
      {...remainingProps}
      onChange={(newValue) => {
        setEnteredValue(newValue);
        onChange(newValue);
      }}
      value={enteredValue}
      ref={undefined}
    />
  );
};

const TemplateSingle: ComponentStory<typeof NumberInput> = (props) => (
  <TemplateInput {...props} />
);

const TemplateMultiple: ComponentStory<typeof NumberInput> = ({
  id,
  label,
  ...props
}: NumberInputProps) => (
  <>
    <TemplateInput
      {...props}
      label={`${label} 1`}
      id={`${id}_1`}
      ref={undefined}
    />
    <TemplateInput
      {...props}
      label={`${label} 2`}
      id={`${id}_2`}
      ref={undefined}
    />
  </>
);

export const Default = TemplateSingle.bind({});
Default.args = {
  id: 'test-id',
  name: 'Test name',
  label: 'Test label:',
};

export const WithInitialValue = TemplateSingle.bind({});
WithInitialValue.args = {
  ...Default.args,
  value: 420,
};

export const WithMinValue = TemplateSingle.bind({});
WithMinValue.args = {
  ...Default.args,
  min: 0,
};

export const WithMaxValue = TemplateSingle.bind({});
WithMaxValue.args = {
  ...Default.args,
  max: 100,
};

export const Multiple = TemplateMultiple.bind({});
Multiple.args = {
  ...Default.args,
  label: 'Test label',
};
