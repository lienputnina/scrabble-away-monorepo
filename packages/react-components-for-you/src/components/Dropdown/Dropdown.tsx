import {
  Dispatch,
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent,
  RefAttributes,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';

import { KeyCodes } from '../../constants/KeyCodes';

import variables from '../../styles/scss/variables.module.scss';
import './Dropdown.scss';

const { prefix } = variables;

export type Option = {
  id: string;
  value: string;
};

export type DropdownOnChange = (id: string, value: string) => void;

export type OnKeyDownParams = {
  event: KeyboardEvent<HTMLDivElement>;
  options: Option[];
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  focusedOptionIndex: number;
  setFocusedOptionIndex: Dispatch<SetStateAction<number>>;
  onChange: DropdownOnChange;
};

export const dropdownOnKeyDown = ({
  event,
  options,
  isMenuOpen,
  onChange,
  focusedOptionIndex,
  setFocusedOptionIndex,
  setIsMenuOpen,
}: OnKeyDownParams) => {
  const optionsLength = options.length;

  const isLastOption = focusedOptionIndex === optionsLength - 1;
  const isFirstOption = focusedOptionIndex === 0;

  switch (event.code) {
    case KeyCodes.ARROW_UP:
      event.preventDefault();
      if (!isFirstOption) {
        setFocusedOptionIndex(focusedOptionIndex - 1);
      }
      break;

    case KeyCodes.ARROW_DOWN:
      event.preventDefault();
      if (!isLastOption) {
        setFocusedOptionIndex(focusedOptionIndex + 1);
      }
      break;

    case KeyCodes.PAGE_UP:
      setFocusedOptionIndex(0);
      break;

    case KeyCodes.PAGE_DOWN:
      setFocusedOptionIndex(optionsLength - 1);
      break;

    case KeyCodes.ENTER:
    case KeyCodes.SPACE:
      if (isMenuOpen) {
        const id = options.at(focusedOptionIndex)?.id;
        const value = options.at(focusedOptionIndex)?.value;

        if (id && value) {
          onChange(id, value);
        }

        setIsMenuOpen(false);
      } else {
        setIsMenuOpen(true);
      }
      break;

    default:
      break;
  }
};

export const defaultPlaceholder = 'Select option';

export interface DropdownProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id: string;
  label: string;
  placeholderText?: string;
  options: Option[];
  selectedOptionId?: string;
  onChange: DropdownOnChange;
}

export const Dropdown: ForwardRefExoticComponent<
  DropdownProps & RefAttributes<HTMLDivElement>
> = forwardRef(
  (
    {
      id,
      label,
      placeholderText = defaultPlaceholder,
      options,
      onChange,
      selectedOptionId,
      className,
      ...remainingProps
    }: DropdownProps,
    ref,
  ) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

    useEffect(() => {
      const newIndex = options.findIndex(
        (option) => option.id === selectedOptionId,
      );

      if (newIndex !== -1) {
        setFocusedOptionIndex(newIndex);
      }
    }, [selectedOptionId]);

    const focusedOptionId = options[focusedOptionIndex]?.id;

    return (
      <div
        className={classNames(`${prefix}-dropdown`, className)}
        {...remainingProps}
      >
        <label id={`${id}_label`} htmlFor={`${id}_dropdown`}>
          {label}
        </label>
        <div
          id={`${id}-dropdown`}
          className="dropdown"
          role="combobox"
          aria-labelledby={`${id}_label`}
          aria-activedescendant={
            selectedOptionId || isMenuOpen
              ? `${id}_${focusedOptionId}`
              : undefined
          }
          aria-controls={`${id}_menu`}
          aria-expanded={isMenuOpen}
          tabIndex={0}
          onKeyDown={(event) =>
            dropdownOnKeyDown({
              event,
              options,
              isMenuOpen,
              setIsMenuOpen,
              focusedOptionIndex,
              setFocusedOptionIndex,
              onChange,
            })
          }
          onClick={() => setIsMenuOpen((previousValue) => !previousValue)}
          onBlur={() => setIsMenuOpen(false)}
          ref={ref}
        >
          {options.find((option) => option.id === selectedOptionId)?.value ||
            placeholderText}
        </div>
        <ul
          id={`${id}_menu`}
          className={classNames(
            'menu',
            {
              hidden: !isMenuOpen,
            },
            className,
          )}
          role="listbox"
        >
          {options.map((option) => (
            <li
              role="option"
              key={option.id}
              id={`${id}_${option.id}`}
              value={option.value}
              aria-selected={option.id === focusedOptionId}
              onMouseDown={(event) => {
                event.preventDefault();
                onChange(option.id, option.value);
                setIsMenuOpen(false);
              }}
            >
              {option.value}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';
