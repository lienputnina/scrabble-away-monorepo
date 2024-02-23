import { FC, HTMLAttributes, KeyboardEvent } from 'react';

import classNames from 'classnames';

import { KeyCodes } from '../../constants/KeyCodes';

import variables from '../../styles/scss/variables.module.scss';
import './Switch.scss';

const { prefix } = variables;

export type SwitchOnChange = (newValue: boolean) => void;

export type SwitchOnKeyDownParams = {
  event: KeyboardEvent<HTMLDivElement>;
  isChecked?: boolean;
  onChange: SwitchOnChange;
};

export const SwitchOnKeyDown = ({
  event,
  isChecked,
  onChange,
}: SwitchOnKeyDownParams) => {
  switch (event.code) {
    case KeyCodes.SPACE:
    case KeyCodes.ENTER:
      onChange(!isChecked);
      break;
    default:
      break;
  }
};

export interface SwitchProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id: string;
  label: string;
  isChecked?: boolean;
  positiveState?: string;
  negativeState?: string;
  labelPosition?: SwitchLabelPosition;
  onChange: SwitchOnChange;
}

export enum SwitchStateLabels {
  ON = 'On',
  OFF = 'Off',
}

export enum SwitchLabelPosition {
  TOP = 'top',
  LEFT = 'left',
  RIGHT = 'right',
}

export const Switch: FC<SwitchProps> = ({
  id,
  label,
  isChecked,
  positiveState = SwitchStateLabels.ON,
  negativeState = SwitchStateLabels.OFF,
  labelPosition = SwitchLabelPosition.TOP,
  onChange,
  ...remainingProps
}) => (
  <div
    {...remainingProps}
    className={classNames(`${prefix}-switch-toggle`, labelPosition)}
    role="switch"
    aria-checked={!!isChecked}
    aria-labelledby={`${id}_label`}
    tabIndex={0}
    onClick={() => onChange(!isChecked)}
    onKeyDown={(event) =>
      SwitchOnKeyDown({
        event,
        isChecked,
        onChange,
      })
    }
  >
    <label id={`${id}_label`} htmlFor={`${id}_switch-button`} className="label">
      {label}
    </label>
    <div
      className={classNames('switch-button', {
        'is-checked': isChecked,
      })}
      id={`${id}_switch-button`}
    >
      <span className="switch-handle">
        <span className="switch-knob" />
      </span>
      <span className="switch-on" aria-hidden="true">
        {positiveState}
      </span>
      <span className="switch-off" aria-hidden="true">
        {negativeState}
      </span>
    </div>
  </div>
);
