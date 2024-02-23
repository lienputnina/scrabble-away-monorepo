import type { KeyboardEvent } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KeyCodes } from '../../constants';

import {
  onKeyDown,
  RadioInputGroup,
  RadioInputGroupProps,
  Option,
} from './RadioInputGroup';

const testOptions = [
  { id: 'id-1', value: 'value-1', label: 'label-1' },
  { id: 'id-2', value: 'value-2', label: 'label-2' },
  { id: 'id-3', value: 'value-3', label: 'label-3' },
];

describe('RadioInputGroup', () => {
  const defaultProps: RadioInputGroupProps = {
    id: 'test-id',
    label: 'Test label',
    options: testOptions,
    onChange: () => {},
  };

  it('should render without crashing', () => {
    render(<RadioInputGroup {...defaultProps} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('should render the provided options', () => {
    render(<RadioInputGroup {...defaultProps} />);
    defaultProps.options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('should make the option with the provided checkedOptionId checked', () => {
    const checkedOption = defaultProps.options[1]!;
    render(
      <RadioInputGroup {...defaultProps} checkedOptionId={checkedOption?.id} />,
    );
    expect(screen.getByText(checkedOption.label)).toBeChecked();
  });

  it('should not make any option checked if no checkedOptionId is provided', () => {
    render(<RadioInputGroup {...defaultProps} />);
    defaultProps.options.forEach((option) => {
      expect(screen.getByText(option.label)).not.toBeChecked();
    });
  });

  it('should set the aria-activedescendant attribute to the provided checkedOptionId', () => {
    const checkedOption = defaultProps.options[1]!;
    render(
      <RadioInputGroup {...defaultProps} checkedOptionId={checkedOption?.id} />,
    );
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-activedescendant',
      `${defaultProps.id}_${checkedOption.id}`,
    );
  });

  it('should not set the aria-activedescendant attribute if the provided checkedOptionId is not an id of the provided options', () => {
    render(
      <RadioInputGroup {...defaultProps} checkedOptionId="incorrect-id" />,
    );
    expect(screen.getByRole('radiogroup')).not.toHaveAttribute(
      'aria-activedescendant',
    );
  });

  it('should pass down the provided onChange handler to the radio input options', async () => {
    const user = userEvent.setup();
    const clickedOption = defaultProps.options[2]!;
    const onChangeMock = jest.fn();
    render(<RadioInputGroup {...defaultProps} onChange={onChangeMock} />);
    expect(onChangeMock).not.toHaveBeenCalled();

    await user.click(screen.getByText(clickedOption.label));
    expect(onChangeMock).toHaveBeenCalled();
  });

  describe('User events', () => {
    it('should become focused when user tabs on it', async () => {
      const user = userEvent.setup();
      render(<RadioInputGroup {...defaultProps} />);

      await user.tab();
      expect(screen.getByRole('radiogroup')).toHaveFocus();
    });

    it('should loose focus when user tabs away from it', async () => {
      const user = userEvent.setup();
      render(<RadioInputGroup {...defaultProps} />);

      await user.tab();
      await user.tab();
      expect(screen.getByRole('radiogroup')).not.toHaveFocus();
    });

    it(`should call the onChange callback with the next option on pressing ${KeyCodes.ARROW_RIGHT}`, async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();
      const checkedOptionIndex = 1;
      const nextCheckedOptionIndex = checkedOptionIndex + 1;
      const checkedOption = defaultProps.options[checkedOptionIndex]!;
      const nextCheckedOption = defaultProps.options[nextCheckedOptionIndex]!;
      render(
        <RadioInputGroup
          {...defaultProps}
          checkedOptionId={checkedOption.id}
          onChange={onChangeMock}
        />,
      );
      expect(onChangeMock).not.toHaveBeenCalled();

      await user.tab();
      await user.keyboard(`{${KeyCodes.ARROW_RIGHT}}`);
      expect(onChangeMock).toHaveBeenCalledWith(
        nextCheckedOption.id,
        nextCheckedOption.value,
      );
    });

    it(`should call the onChange callback with the next option on pressing ${KeyCodes.ARROW_DOWN}`, async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();
      const checkedOptionIndex = 1;
      const nextCheckedOptionIndex = checkedOptionIndex + 1;
      const checkedOption = defaultProps.options[checkedOptionIndex]!;
      const nextCheckedOption = defaultProps.options[nextCheckedOptionIndex]!;
      render(
        <RadioInputGroup
          {...defaultProps}
          checkedOptionId={checkedOption.id}
          onChange={onChangeMock}
        />,
      );
      expect(onChangeMock).not.toHaveBeenCalled();

      await user.tab();
      await user.keyboard(`{${KeyCodes.ARROW_DOWN}}`);
      expect(onChangeMock).toHaveBeenCalledWith(
        nextCheckedOption.id,
        nextCheckedOption.value,
      );
    });

    it(`should call the onChange callback with the previous option on pressing ${KeyCodes.ARROW_LEFT}`, async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();
      const checkedOptionIndex = 1;
      const nextCheckedOptionIndex = checkedOptionIndex - 1;
      const checkedOption = defaultProps.options[checkedOptionIndex]!;
      const nextCheckedOption = defaultProps.options[nextCheckedOptionIndex]!;
      render(
        <RadioInputGroup
          {...defaultProps}
          checkedOptionId={checkedOption.id}
          onChange={onChangeMock}
        />,
      );
      expect(onChangeMock).not.toHaveBeenCalled();

      await user.tab();
      await user.keyboard(`{${KeyCodes.ARROW_LEFT}}`);
      expect(onChangeMock).toHaveBeenCalledWith(
        nextCheckedOption.id,
        nextCheckedOption.value,
      );
    });

    it(`should call the onChange callback with the previous option on pressing ${KeyCodes.ARROW_UP}`, async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();
      const checkedOptionIndex = 1;
      const nextCheckedOptionIndex = checkedOptionIndex - 1;
      const checkedOption = defaultProps.options[checkedOptionIndex]!;
      const nextCheckedOption = defaultProps.options[nextCheckedOptionIndex]!;
      render(
        <RadioInputGroup
          {...defaultProps}
          checkedOptionId={checkedOption.id}
          onChange={onChangeMock}
        />,
      );
      expect(onChangeMock).not.toHaveBeenCalled();

      await user.tab();
      await user.keyboard(`{${KeyCodes.ARROW_UP}}`);
      expect(onChangeMock).toHaveBeenCalledWith(
        nextCheckedOption.id,
        nextCheckedOption.value,
      );
    });

    it(`should call the onChange callback with the first option on pressing ${KeyCodes.ARROW_RIGHT} if the currently checked option is the last one`, async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();
      const checkedOptionIndex = defaultProps.options.length - 1;
      const nextCheckedOptionIndex = 0;
      const checkedOption = defaultProps.options[checkedOptionIndex]!;
      const nextCheckedOption = defaultProps.options[nextCheckedOptionIndex]!;
      render(
        <RadioInputGroup
          {...defaultProps}
          checkedOptionId={checkedOption.id}
          onChange={onChangeMock}
        />,
      );
      expect(onChangeMock).not.toHaveBeenCalled();

      await user.tab();
      await user.keyboard(`{${KeyCodes.ARROW_RIGHT}}`);
      expect(onChangeMock).toHaveBeenCalledWith(
        nextCheckedOption.id,
        nextCheckedOption.value,
      );
    });

    it(`should call the onChange callback with the last option on pressing ${KeyCodes.ARROW_LEFT} if the currently checked option is the first one`, async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();
      const checkedOptionIndex = 0;
      const nextCheckedOptionIndex = defaultProps.options.length - 1;
      const checkedOption = defaultProps.options[checkedOptionIndex]!;
      const nextCheckedOption = defaultProps.options[nextCheckedOptionIndex]!;
      render(
        <RadioInputGroup
          {...defaultProps}
          checkedOptionId={checkedOption.id}
          onChange={onChangeMock}
        />,
      );
      expect(onChangeMock).not.toHaveBeenCalled();

      await user.tab();
      await user.keyboard(`{${KeyCodes.ARROW_LEFT}}`);
      expect(onChangeMock).toHaveBeenCalledWith(
        nextCheckedOption.id,
        nextCheckedOption.value,
      );
    });

    it(`should call the onChange callback with the clicked option id and value on mouse click`, async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();
      const clickedOption = defaultProps.options[2]!;
      render(<RadioInputGroup {...defaultProps} onChange={onChangeMock} />);
      expect(onChangeMock).not.toHaveBeenCalled();

      await user.click(screen.getByText(clickedOption.label));
      expect(onChangeMock).toHaveBeenCalledWith(
        clickedOption.id,
        clickedOption.value,
      );
    });
  });
});

describe('onKeyDown', () => {
  const event = { code: '' } as KeyboardEvent<HTMLUListElement>;
  const options: Option[] = testOptions;

  const nextOptionToggles = [KeyCodes.ARROW_DOWN, KeyCodes.ARROW_RIGHT];
  const previousOptionToggles = [KeyCodes.ARROW_UP, KeyCodes.ARROW_LEFT];

  nextOptionToggles.forEach((toggle) => {
    it(`should call the provided onChange with the next option id and value on pressing ${toggle}`, () => {
      const onChangeMock = jest.fn();
      const eventCode = toggle;
      const checkedOptionIndex = 1;
      const nextCheckedOptionIndex = checkedOptionIndex + 1;
      const checkedOption = testOptions[checkedOptionIndex]!;
      const nextCheckedOption = testOptions[nextCheckedOptionIndex]!;
      expect(onChangeMock).not.toHaveBeenCalled();

      onKeyDown(
        { ...event, code: eventCode },
        options,
        onChangeMock,
        checkedOption.id,
      );
      expect(onChangeMock).toHaveBeenCalledWith(
        nextCheckedOption.id,
        nextCheckedOption.value,
      );
    });
  });

  previousOptionToggles.forEach((toggle) => {
    it(`should call the provided onChange with the previous option id and value on pressing ${toggle}`, () => {
      const onChangeMock = jest.fn();
      const eventCode = toggle;
      const checkedOptionIndex = 1;
      const nextCheckedOptionIndex = checkedOptionIndex - 1;
      const checkedOption = testOptions[checkedOptionIndex]!;
      const nextCheckedOption = testOptions[nextCheckedOptionIndex]!;
      expect(onChangeMock).not.toHaveBeenCalled();

      onKeyDown(
        { ...event, code: eventCode },
        options,
        onChangeMock,
        checkedOption.id,
      );
      expect(onChangeMock).toHaveBeenCalledWith(
        nextCheckedOption.id,
        nextCheckedOption.value,
      );
    });
  });

  nextOptionToggles.forEach((toggle) => {
    it(`should call the provided onChange with the first option id and value on pressing ${toggle} if the last option is checked`, () => {
      const onChangeMock = jest.fn();
      const eventCode = toggle;
      const checkedOptionIndex = testOptions.length - 1;
      const nextCheckedOptionIndex = 0;
      const checkedOption = testOptions[checkedOptionIndex]!;
      const nextCheckedOption = testOptions[nextCheckedOptionIndex]!;
      expect(onChangeMock).not.toHaveBeenCalled();

      onKeyDown(
        { ...event, code: eventCode },
        options,
        onChangeMock,
        checkedOption.id,
      );
      expect(onChangeMock).toHaveBeenCalledWith(
        nextCheckedOption.id,
        nextCheckedOption.value,
      );
    });
  });

  previousOptionToggles.forEach((toggle) => {
    it(`should call the provided onChange with the last option id and value on pressing ${toggle} if the first option is checked`, () => {
      const onChangeMock = jest.fn();
      const eventCode = toggle;
      const checkedOptionIndex = 0;
      const nextCheckedOptionIndex = testOptions.length - 1;
      const checkedOption = testOptions[checkedOptionIndex]!;
      const nextCheckedOption = testOptions[nextCheckedOptionIndex]!;
      expect(onChangeMock).not.toHaveBeenCalled();

      onKeyDown(
        { ...event, code: eventCode },
        options,
        onChangeMock,
        checkedOption.id,
      );
      expect(onChangeMock).toHaveBeenCalledWith(
        nextCheckedOption.id,
        nextCheckedOption.value,
      );
    });
  });
});
