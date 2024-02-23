import { render, screen } from '@testing-library/react';
import type { KeyboardEvent } from 'react';
import userEvent from '@testing-library/user-event';
import { KeyCodes, SPACE_SYMBOL } from '../../constants/KeyCodes';

import {
  dropdownOnKeyDown,
  OnKeyDownParams,
  Dropdown,
  defaultPlaceholder,
} from './Dropdown';

const testOptions = [
  { id: 'id-1', value: 'value-1' },
  { id: 'id-2', value: 'value-2' },
  { id: 'id-3', value: 'value-3' },
];

const defaultProps = {
  id: 'test-id',
  label: 'Test label',
  value: 'Test value',
  options: testOptions,
  onChange: () => {},
};

describe('Dropdown', () => {
  it('should render without crashing', () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render the provided options', () => {
    render(<Dropdown {...defaultProps} />);
    defaultProps.options.forEach((option) => {
      expect(screen.getByText(option.value)).toBeInTheDocument();
    });
  });

  it(`should display the default placeholder ${defaultPlaceholder} if no selectedOptionId is provided`, () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.getByText(defaultPlaceholder)).toBeInTheDocument();
  });

  it(`should display the provided placeholderText if no selectedOptionId is provided`, () => {
    const placeholderText = 'test placeholder';
    render(<Dropdown {...defaultProps} placeholderText={placeholderText} />);
    expect(screen.getByText(placeholderText)).toBeInTheDocument();
  });

  it('should select the option that has the id of the provided selectedOptionId', () => {
    const selectedOption = testOptions[1]!;
    render(<Dropdown {...defaultProps} selectedOptionId={selectedOption.id} />);
    expect(
      screen.getByText(selectedOption.value, { selector: '[role=combobox]' }),
    ).toBeInTheDocument();
  });

  it('should have the aria-activedescendant that includes the id of the selected option', () => {
    const selectedOption = testOptions[1]!;
    render(<Dropdown {...defaultProps} selectedOptionId={selectedOption.id} />);
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-activedescendant',
      expect.stringContaining(selectedOption.id),
    );
  });

  it('should set aria-selected=true to the selected option', () => {
    const selectedOption = testOptions[1]!;
    render(<Dropdown {...defaultProps} selectedOptionId={selectedOption.id} />);
    expect(
      screen.getByText(selectedOption.value, { selector: '[role=option]' }),
    ).toHaveAttribute('aria-selected', 'true');
  });

  describe('User events', () => {
    describe('Dropdown focus state', () => {
      it('should become focused when the user tabs on it', async () => {
        const user = userEvent.setup();
        render(<Dropdown {...defaultProps} />);
        expect(screen.getByRole('combobox')).not.toHaveFocus();

        await user.tab();
        expect(screen.getByRole('combobox')).toHaveFocus();
      });

      it('should loose focus when user tabs away from it', async () => {
        const user = userEvent.setup();
        render(<Dropdown {...defaultProps} />);

        await user.tab();
        await user.tab();
        expect(screen.getByRole('combobox')).not.toHaveFocus();
      });
    });

    describe('Toggling the option list', () => {
      describe('With mouse', () => {
        it('should open the option list when the user clicks on the dropdown input', async () => {
          const user = userEvent.setup();
          render(<Dropdown {...defaultProps} />);
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'false',
          );

          await user.click(screen.getByRole('combobox'));
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'true',
          );
        });

        it('should close the opened option list when the user clicks on the dropdown input', async () => {
          const user = userEvent.setup();
          render(<Dropdown {...defaultProps} />);

          await user.click(screen.getByRole('combobox'));
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'true',
          );

          await user.click(screen.getByRole('combobox'));
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'false',
          );
        });

        it('should close the opened option list when the user clicks outside the dropdown input', async () => {
          const user = userEvent.setup();
          render(<Dropdown {...defaultProps} />);

          await user.click(screen.getByRole('combobox'));
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'true',
          );

          await user.click(screen.getByText(defaultProps.label));
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'false',
          );
        });
      });

      describe('With keyboard', () => {
        it(`should open the option list when the user presses ${KeyCodes.ENTER}`, async () => {
          const user = userEvent.setup();
          render(<Dropdown {...defaultProps} />);
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'false',
          );

          await user.tab();
          await user.keyboard(`{${KeyCodes.ENTER}}`);
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'true',
          );
        });

        it(`should close the opened option list when the user presses ${KeyCodes.ENTER}`, async () => {
          const user = userEvent.setup();
          render(<Dropdown {...defaultProps} />);

          await user.tab();
          await user.keyboard(`{${KeyCodes.ENTER}}`);
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'true',
          );

          await user.keyboard(`{${KeyCodes.ENTER}}`);
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'false',
          );
        });

        it(`should open the option list when the user presses "${SPACE_SYMBOL}" symbol`, async () => {
          const user = userEvent.setup();
          render(<Dropdown {...defaultProps} />);
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'false',
          );

          await user.tab();
          await user.keyboard(SPACE_SYMBOL);
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'true',
          );
        });

        it(`should close the opened option list when the user presses "${SPACE_SYMBOL}" symbol`, async () => {
          const user = userEvent.setup();
          render(<Dropdown {...defaultProps} />);

          await user.tab();
          await user.keyboard(SPACE_SYMBOL);
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'true',
          );

          await user.keyboard(SPACE_SYMBOL);
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'false',
          );
        });

        it('should close the opened option list when the user tabs away from the dropdown input', async () => {
          const user = userEvent.setup();
          render(<Dropdown {...defaultProps} />);

          await user.tab();
          await user.keyboard(`{${KeyCodes.ENTER}}`);
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'true',
          );

          await user.tab();
          expect(screen.getByRole('combobox')).toHaveAttribute(
            'aria-expanded',
            'false',
          );
        });
      });

      describe('option list visibility', () => {
        it('should not have the "hidden" class if the option list is open', async () => {
          const user = userEvent.setup();
          render(<Dropdown {...defaultProps} />);
          await user.click(screen.getByRole('combobox'));
          expect(screen.getByRole('listbox')).not.toHaveClass('hidden');
        });

        it('should have the "hidden" class if the option list is closed', async () => {
          render(<Dropdown {...defaultProps} />);
          expect(screen.getByRole('listbox')).toHaveClass('hidden');
        });
      });
    });

    describe('Changing the active option', () => {
      it('should update the aria-activedescendant', async () => {
        const user = userEvent.setup();
        render(<Dropdown {...defaultProps} />);

        await user.tab();
        expect(screen.getByRole('combobox')).not.toHaveAttribute(
          'aria-activedescendant',
        );

        await user.keyboard(`{${KeyCodes.ENTER}}`);
        expect(screen.getByRole('combobox')).toHaveAttribute(
          'aria-activedescendant',
          expect.stringContaining(defaultProps.options[0]!.id),
        );

        await user.keyboard(`{${KeyCodes.ARROW_DOWN}}`);
        expect(screen.getByRole('combobox')).toHaveAttribute(
          'aria-activedescendant',
          expect.stringContaining(defaultProps.options[1]!.id),
        );
      });
    });

    describe('Option selection', () => {
      describe('With mouse', () => {
        it('should call the passed down onChange callback with the clicked option id and value', async () => {
          const onChangeMock = jest.fn();
          const user = userEvent.setup();
          const selectedOption = defaultProps.options[1]!;
          render(<Dropdown {...defaultProps} onChange={onChangeMock} />);
          expect(onChangeMock).not.toHaveBeenCalled();

          await user.click(screen.getByRole('combobox'));
          await user.click(
            screen.getByText(selectedOption.value, {
              selector: '[role=option]',
            }),
          );
          expect(onChangeMock).toHaveBeenCalledWith(
            selectedOption.id,
            selectedOption.value,
          );
        });
      });

      describe('With keyboard', () => {
        it(`should call the passed down onChange callback with the selected option id and value on ${KeyCodes.ENTER} press`, async () => {
          const onChangeMock = jest.fn();
          const user = userEvent.setup();
          const selectedOption = defaultProps.options[1]!;
          render(<Dropdown {...defaultProps} onChange={onChangeMock} />);
          expect(onChangeMock).not.toHaveBeenCalled();

          await user.click(screen.getByRole('combobox'));
          await user.keyboard(`{${KeyCodes.ARROW_DOWN}}`);
          await user.keyboard(`{${KeyCodes.ENTER}}`);
          expect(onChangeMock).toHaveBeenCalledWith(
            selectedOption.id,
            selectedOption.value,
          );
        });

        it(`should call the passed down onChange callback with the selected option id and value on "${SPACE_SYMBOL}" symbol press`, async () => {
          const onChangeMock = jest.fn();
          const user = userEvent.setup();
          const selectedOption = defaultProps.options[1]!;
          render(<Dropdown {...defaultProps} onChange={onChangeMock} />);
          expect(onChangeMock).not.toHaveBeenCalled();

          await user.click(screen.getByRole('combobox'));
          await user.keyboard(`{${KeyCodes.ARROW_DOWN}}`);
          await user.keyboard(SPACE_SYMBOL);
          expect(onChangeMock).toHaveBeenCalledWith(
            selectedOption.id,
            selectedOption.value,
          );
        });
      });

      it('should close the option list when an option is selected', async () => {
        const user = userEvent.setup();
        const selectedOption = defaultProps.options[1]!;
        render(<Dropdown {...defaultProps} />);

        await user.click(screen.getByRole('combobox'));
        expect(screen.getByRole('combobox')).toHaveAttribute(
          'aria-expanded',
          'true',
        );

        await user.click(
          screen.getByText(selectedOption.value, {
            selector: '[role=option]',
          }),
        );
        expect(screen.getByRole('combobox')).toHaveAttribute(
          'aria-expanded',
          'false',
        );
      });
    });
  });
});

describe('dropdownOnKeyDown', () => {
  const defaultParams: OnKeyDownParams = {
    event: {
      preventDefault: jest.fn(),
      code: '',
    } as unknown as KeyboardEvent<HTMLDivElement>,
    options: defaultProps.options,
    isMenuOpen: false,
    setIsMenuOpen: jest.fn(),
    focusedOptionIndex: 0,
    setFocusedOptionIndex: jest.fn(),
    onChange: jest.fn(),
  };

  describe(KeyCodes.ARROW_UP, () => {
    const code = KeyCodes.ARROW_UP;

    it('should call preventDefault() on the provided event', () => {
      expect(defaultParams.event.preventDefault).not.toHaveBeenCalled();
      dropdownOnKeyDown({
        ...defaultParams,
        event: { ...defaultParams.event, code },
      });
      expect(defaultParams.event.preventDefault).toHaveBeenCalled();
    });

    it('should call the provided setFocusedOptionIndex() with the provided focusedOptionIndex - 1 if focusedOptionIndex!=0', () => {
      const focusedOptionIndex = 2;
      expect(defaultParams.setFocusedOptionIndex).not.toHaveBeenCalled();
      dropdownOnKeyDown({
        ...defaultParams,
        event: { ...defaultParams.event, code },
        focusedOptionIndex,
      });
      expect(defaultParams.setFocusedOptionIndex).toHaveBeenCalledWith(
        focusedOptionIndex - 1,
      );
    });

    it('should not call the provided setFocusedOptionIndex() if the provided focusedOptionIndex=0', () => {
      dropdownOnKeyDown({
        ...defaultParams,
        event: { ...defaultParams.event, code },
        focusedOptionIndex: 0,
      });
      expect(defaultParams.setFocusedOptionIndex).not.toHaveBeenCalled();
    });
  });

  describe(KeyCodes.ARROW_DOWN, () => {
    const code = KeyCodes.ARROW_DOWN;

    it('should call preventDefault() on the provided event', () => {
      expect(defaultParams.event.preventDefault).not.toHaveBeenCalled();
      dropdownOnKeyDown({
        ...defaultParams,
        event: { ...defaultParams.event, code },
      });
      expect(defaultParams.event.preventDefault).toHaveBeenCalled();
    });

    it('should call the provided setFocusedOptionIndex() with the provided focusedOptionIndex + 1 if focusedOptionIndex is not the last option index', () => {
      const focusedOptionIndex = 0;
      expect(defaultParams.setFocusedOptionIndex).not.toHaveBeenCalled();
      dropdownOnKeyDown({
        ...defaultParams,
        event: { ...defaultParams.event, code },
        focusedOptionIndex,
      });
      expect(defaultParams.setFocusedOptionIndex).toHaveBeenCalledWith(
        focusedOptionIndex + 1,
      );
    });

    it('should not call the provided setFocusedOptionIndex() if the provided focusedOptionIndex is the last option index', () => {
      dropdownOnKeyDown({
        ...defaultParams,
        event: { ...defaultParams.event, code },
        focusedOptionIndex: defaultProps.options.length - 1,
      });
      expect(defaultParams.setFocusedOptionIndex).not.toHaveBeenCalled();
    });
  });

  describe(KeyCodes.PAGE_UP, () => {
    const code = KeyCodes.PAGE_UP;

    it('should call the provided setFocusedOptionIndex() with 0', () => {
      expect(defaultParams.setFocusedOptionIndex).not.toHaveBeenCalled();
      dropdownOnKeyDown({
        ...defaultParams,
        event: { ...defaultParams.event, code },
      });
      expect(defaultParams.setFocusedOptionIndex).toHaveBeenCalledWith(0);
    });
  });

  describe(KeyCodes.PAGE_DOWN, () => {
    const code = KeyCodes.PAGE_DOWN;

    it('should call the provided setFocusedOptionIndex() with the last option index', () => {
      expect(defaultParams.setFocusedOptionIndex).not.toHaveBeenCalled();
      dropdownOnKeyDown({
        ...defaultParams,
        event: { ...defaultParams.event, code },
      });
      expect(defaultParams.setFocusedOptionIndex).toHaveBeenCalledWith(
        defaultProps.options.length - 1,
      );
    });
  });

  describe(`${KeyCodes.ENTER} and ${KeyCodes.SPACE}`, () => {
    const codes = [KeyCodes.ENTER, KeyCodes.SPACE];

    codes.forEach((code) => {
      it('should call the provided setIsMenuOpen() with true if the provided isMenuOpen=false', () => {
        expect(defaultParams.setIsMenuOpen).not.toHaveBeenCalled();
        dropdownOnKeyDown({
          ...defaultParams,
          event: { ...defaultParams.event, code },
          isMenuOpen: false,
        });
        expect(defaultParams.setIsMenuOpen).toHaveBeenCalledWith(true);
      });
    });

    codes.forEach((code) => {
      it('should call the provided setIsMenuOpen() with false if the provided isMenuOpen=true', () => {
        expect(defaultParams.setIsMenuOpen).not.toHaveBeenCalled();
        dropdownOnKeyDown({
          ...defaultParams,
          event: { ...defaultParams.event, code },
          isMenuOpen: true,
        });
        expect(defaultParams.setIsMenuOpen).toHaveBeenCalledWith(false);
      });
    });

    codes.forEach((code) => {
      it('should call the provided onChange() with the focused option id and value', () => {
        const focusedOptionIndex = 1;
        expect(defaultParams.onChange).not.toHaveBeenCalled();
        dropdownOnKeyDown({
          ...defaultParams,
          event: { ...defaultParams.event, code },
          isMenuOpen: true,
          focusedOptionIndex,
        });
        expect(defaultParams.onChange).toHaveBeenCalledWith(
          defaultProps.options[focusedOptionIndex]!.id,
          defaultProps.options[focusedOptionIndex]!.value,
        );
      });
    });
  });

  describe('Any other key', () => {
    it('should do nothing and not crash', () => {
      dropdownOnKeyDown({
        ...defaultParams,
        event: { ...defaultParams.event, code: '' },
        isMenuOpen: false,
      });
    });
  });
});
