import classNames from 'classnames';
import {
  ForwardRefExoticComponent,
  HTMLProps,
  RefAttributes,
  forwardRef,
} from 'react';

import variables from '../../styles/scss/variables.module.scss';
import './TextInput.scss';

const { prefix } = variables;

export interface TextInputProps
  extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
  id: string;
  name?: string;
  label: string;
  value?: string;
  onChange: (newValue: string) => void;
}

export const TextInput: ForwardRefExoticComponent<
  TextInputProps & RefAttributes<HTMLInputElement>
> = forwardRef(
  (
    {
      id,
      name,
      label,
      value,
      onChange,
      className,
      ...remainingProps
    }: TextInputProps,
    ref,
  ) => (
    <div className={classNames(`${prefix}-text-input`, className)}>
      <label id={`${id}-label`} htmlFor={`${id}-input`}>
        {label}
      </label>
      <input
        {...remainingProps}
        id={`${id}-input`}
        type="text"
        name={name}
        value={value}
        aria-labelledby={`${id}-label`}
        onChange={(event) => onChange(event.target.value)}
        ref={ref}
      />
    </div>
  ),
);

TextInput.displayName = 'TextInput';
