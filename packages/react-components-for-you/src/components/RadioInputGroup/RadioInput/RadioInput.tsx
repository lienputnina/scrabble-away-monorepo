import classNames from 'classnames';
import {
  ForwardRefExoticComponent,
  HTMLProps,
  RefAttributes,
  forwardRef,
} from 'react';

import { RadioButtonChecked, RadioButtonUnChecked } from '../../../assets';

import variables from '../../../styles/scss/variables.module.scss';
import './RadioInput.scss';

const { prefix } = variables;

export type RadioInputOnChange = (id: string, value: string) => void;

export interface RadioInputProps
  extends Omit<HTMLProps<HTMLLIElement>, 'onChange'> {
  groupId: string;
  optionId: string;
  label: string;
  value: string;
  isChecked?: boolean;
  onChange: RadioInputOnChange;
}

export const RadioInput: ForwardRefExoticComponent<
  RadioInputProps & RefAttributes<HTMLLIElement>
> = forwardRef(
  (
    {
      groupId,
      optionId,
      label,
      value,
      isChecked,
      onChange,
      className,
      ...remainingProps
    }: RadioInputProps,
    ref,
  ) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      id={`${groupId}_${optionId}`}
      className={classNames(`${prefix}-radio-input`, className)}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="radio"
      aria-checked={isChecked}
      onClick={() => onChange(optionId, value)}
      ref={ref}
      {...remainingProps}
    >
      {isChecked ? (
        <RadioButtonChecked size={12} />
      ) : (
        <RadioButtonUnChecked size={12} />
      )}
      {label}
    </li>
  ),
);

RadioInput.displayName = 'RadioInput';
