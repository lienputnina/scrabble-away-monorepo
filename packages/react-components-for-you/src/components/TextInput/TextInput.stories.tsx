import {
  ForwardRefExoticComponent,
  RefAttributes,
  createRef,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TextInput, TextInputProps } from './TextInput';

export default {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    onChange: { action: 'changed text input value' },
  },
} as ComponentMeta<typeof TextInput>;

const TemplateInput: ForwardRefExoticComponent<
  TextInputProps & RefAttributes<HTMLInputElement>
> = forwardRef(
  (
    { onChange, value: initialValue, ...remainingProps }: TextInputProps,
    ref,
  ) => {
    const [enteredValue, setEnteredValue] = useState(initialValue);

    useEffect(() => {
      setEnteredValue(initialValue);
    }, [initialValue]);

    return (
      <TextInput
        {...remainingProps}
        onChange={(newValue) => {
          setEnteredValue(newValue);
          onChange(newValue);
        }}
        value={enteredValue}
        ref={ref}
      />
    );
  },
);
TemplateInput.displayName = 'TemplateInput';

const TemplateSingle: ComponentStory<typeof TextInput> = (props) => (
  <TemplateInput {...props} />
);

const TemplateMultiple: ComponentStory<typeof TextInput> = ({
  id,
  label,
  ...props
}: TextInputProps) => (
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

const TemplateWithInitialFocus: ComponentStory<typeof TextInput> = (props) => {
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  return <TemplateInput {...props} ref={inputRef} />;
};

export const Default = TemplateSingle.bind({});
Default.args = {
  id: 'test-id',
  name: 'Test name',
  label: 'Test label:',
};

export const WithInitialValue = TemplateSingle.bind({});
WithInitialValue.args = {
  ...Default.args,
  value: 'Yolo swag',
};

export const Multiple = TemplateMultiple.bind({});
Multiple.args = {
  ...Default.args,
};

export const WithInitialFocus = TemplateWithInitialFocus.bind({});
WithInitialFocus.args = {
  ...Default.args,
};
