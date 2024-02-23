import classNames from 'classnames';
import {
  ForwardRefExoticComponent,
  HTMLProps,
  RefAttributes,
  forwardRef,
} from 'react';

import variables from '../../styles/scss/variables.module.scss';
import './NumberInput.scss';

const { prefix } = variables;

export interface NumberInputProps
  extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
  id: string;
  name?: string;
  label: string;
  value?: number;
  min?: number;
  max?: number;
  onChange: (newValue: number) => void;
}

export const NumberInput: ForwardRefExoticComponent<
  NumberInputProps & RefAttributes<HTMLInputElement>
> = forwardRef(
  (
    {
      id,
      name,
      label,
      value,
      min,
      max,
      onChange,
      className,
      ...remainingProps
    }: NumberInputProps,
    ref,
  ) => (
    <div
      className={classNames(`${prefix}-number-input`, className)}
      {...remainingProps}
    >
      <label id={`${id}-label`} htmlFor={`${id}-input`}>
        {label}
      </label>
      <input
        id={`${id}-input`}
        type="number"
        name={name}
        value={value}
        min={min}
        max={max}
        aria-labelledby={`${id}-label`}
        onChange={(event) => onChange(parseInt(event.target.value, 10))}
        ref={ref}
      />
    </div>
  ),
);

NumberInput.displayName = 'NumberInput';
