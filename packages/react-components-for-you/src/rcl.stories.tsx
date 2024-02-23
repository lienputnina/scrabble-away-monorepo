/* eslint-disable react/no-children-prop */
import { FC, useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dropdown, DropdownProps } from './components/Dropdown/Dropdown';
import { Button, ButtonProps, ButtonVariant } from './components/Button/Button';
import { TextInput, TextInputProps } from './components/TextInput/TextInput';
import {
  NumberInput,
  NumberInputProps,
} from './components/NumberInput/NumberInput';
import {
  RadioInputGroup,
  RadioInputGroupProps,
} from './components/RadioInputGroup/RadioInputGroup';
import { Title, TitleLevel, TitleProps } from './components/Title/Title';
import { Text, TextProps, TextStyle } from './components/Text/Text';
import { Header, HeaderProps } from './components/Header/Header';
import {
  Switch,
  SwitchProps,
  SwitchLabelPosition,
} from './components/Switch/Switch';

interface IndexStoryComponentProps {
  headerProps: HeaderProps;
  titleProps: TitleProps;
  textProps: TextProps;
  buttonProps: ButtonProps;
  textInputProps: TextInputProps;
  numberInputProps: NumberInputProps;
  dropdownProps: DropdownProps;
  radioInputGroupProps: RadioInputGroupProps;
  switchProps: SwitchProps;
}

const IndexStoryComponent: FC<IndexStoryComponentProps> = ({
  headerProps,
  titleProps,
  textProps,
  buttonProps,
  textInputProps,
  numberInputProps,
  dropdownProps,
  radioInputGroupProps,
  switchProps,
}: IndexStoryComponentProps) => {
  const [textInputValue, setTextInputValue] = useState(textInputProps.value);
  const [numberInputValue, setNumberInputValue] = useState(
    numberInputProps.value,
  );
  const [dropdownValue, setDropdownValue] = useState(
    dropdownProps.selectedOptionId,
  );
  const [radioInputGroupValue, setRadioInputGroupValue] = useState(
    radioInputGroupProps.checkedOptionId,
  );
  const [switchIsChecked, setSwitchIsChecked] = useState<boolean | undefined>(
    false,
  );

  useEffect(() => {
    setTextInputValue(textInputProps.value);
    setNumberInputValue(numberInputProps.value);
    setDropdownValue(dropdownProps.selectedOptionId);
    setRadioInputGroupValue(radioInputGroupProps.checkedOptionId);
    setSwitchIsChecked(switchProps.isChecked);
  }, [
    textInputProps.value,
    numberInputProps.value,
    dropdownProps.selectedOptionId,
    radioInputGroupProps.checkedOptionId,
    switchProps.isChecked,
  ]);

  return (
    <>
      <div>
        <Header {...headerProps} />
      </div>
      <div>
        <Title
          level={TitleLevel.ONE}
          children="Title level 1"
          {...titleProps}
        />
        <Title
          level={TitleLevel.TWO}
          children="Title level 2"
          {...titleProps}
        />
        <Title
          level={TitleLevel.THREE}
          children="Title level 3"
          {...titleProps}
        />
        <Title
          level={TitleLevel.FOUR}
          children="Title level 4"
          {...titleProps}
        />
      </div>
      <div>
        <Text
          textStyle={TextStyle.REGULAR}
          children="Text regular"
          {...textProps}
        />
        <Text textStyle={TextStyle.BOLD} children="Text bold" {...textProps} />
        <Text
          textStyle={TextStyle.ITALIC}
          children="Text italic"
          {...textProps}
        />
      </div>
      <div>
        <Button
          variant={ButtonVariant.PRIMARY}
          children="Primary Button"
          onClick={action('button-click')}
          {...buttonProps}
        />
        <Button
          variant={ButtonVariant.SECONDARY}
          children="Secondary Button"
          {...buttonProps}
        />
      </div>
      <div>
        <TextInput
          {...textInputProps}
          value={textInputValue}
          onChange={(newValue) => {
            setTextInputValue(newValue);
            textInputProps.onChange(newValue);
          }}
          ref={undefined}
        />
      </div>
      <div>
        <NumberInput
          {...numberInputProps}
          value={numberInputValue}
          onChange={(newValue) => {
            setNumberInputValue(newValue);
            numberInputProps.onChange(newValue);
          }}
          ref={undefined}
        />
      </div>
      <div>
        <Dropdown
          {...dropdownProps}
          selectedOptionId={dropdownValue}
          onChange={(id, value) => {
            setDropdownValue(id);
            dropdownProps.onChange(id, value);
          }}
          ref={undefined}
        />
      </div>
      <div>
        <RadioInputGroup
          {...radioInputGroupProps}
          checkedOptionId={radioInputGroupValue}
          onChange={(id, value) => {
            setRadioInputGroupValue(id);
            radioInputGroupProps.onChange(id, value);
          }}
          ref={undefined}
        />
      </div>
      <div style={{ maxWidth: '200px' }}>
        <Switch
          {...switchProps}
          isChecked={switchIsChecked}
          onChange={(newValue) => {
            setSwitchIsChecked(newValue);
            switchProps.onChange(newValue);
          }}
          labelPosition={SwitchLabelPosition.TOP}
        />
        <Switch
          {...switchProps}
          isChecked={switchIsChecked}
          onChange={(newValue) => {
            setSwitchIsChecked(newValue);
            switchProps.onChange(newValue);
          }}
          labelPosition={SwitchLabelPosition.LEFT}
        />
        <Switch
          {...switchProps}
          isChecked={switchIsChecked}
          onChange={(newValue) => {
            setSwitchIsChecked(newValue);
            switchProps.onChange(newValue);
          }}
          labelPosition={SwitchLabelPosition.RIGHT}
        />
      </div>
    </>
  );
};

export default {
  title: 'ReactComponentsForYou',
  component: IndexStoryComponent,
} as ComponentMeta<typeof IndexStoryComponent>;

const Template: ComponentStory<typeof IndexStoryComponent> = (args) => (
  <IndexStoryComponent {...args} />
);

export const Index = Template.bind({});
Index.args = {
  headerProps: {
    children: (
      <Title style={{ margin: '0' }} level={TitleLevel.FOUR}>
        Header
      </Title>
    ),
  },
  titleProps: {},
  textProps: {},
  buttonProps: {
    onClick: action('Button clicked'),
  },
  textInputProps: {
    id: 'text-input-id',
    name: 'text-input-name',
    label: 'Text input',
    onChange: action('Text input updated'),
  },
  numberInputProps: {
    id: 'number-input-id',
    name: 'number-input-name',
    label: 'Number input',
    onChange: action('Number input updated'),
  },
  dropdownProps: {
    id: 'dropdown-id',
    label: 'Dropdown',
    options: [
      { id: 'option-id-1', value: 'Option 1' },
      { id: 'option-id-2', value: 'Option 2' },
      { id: 'option-id-3', value: 'Option 3' },
    ],
    onChange: action('Dropdown updated'),
  },
  radioInputGroupProps: {
    id: 'radio-button-group-id',
    label: 'Radio button group',
    options: [
      { id: 'option-id-1', value: 'option-value-1', label: 'Option 1' },
      { id: 'option-id-2', value: 'option-value-2', label: 'Option 2' },
      { id: 'option-id-3', value: 'option-value-3', label: 'Option 3' },
    ],
    onChange: action('Radio input group updated'),
  },
  switchProps: {
    id: 'switch-id',
    label: 'Switch',
    labelPosition: SwitchLabelPosition.TOP,
    positiveState: 'On',
    negativeState: 'Off',
    isChecked: false,
    onChange: action('toggled switch'),
  },
};
