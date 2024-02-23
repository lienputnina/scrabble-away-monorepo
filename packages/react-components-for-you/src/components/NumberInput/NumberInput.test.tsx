import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NumberInput } from './NumberInput';

describe('Number input', () => {
  const defaultProps = {
    id: 'Test id',
    label: 'Test label',
    name: 'Test name',
    value: 12345,
    min: 0,
    max: 100,
    onChange: () => {},
  };

  it('should render without crashing', () => {
    render(<NumberInput {...defaultProps} />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('should have a label with the given label value', () => {
    render(<NumberInput {...defaultProps} />);
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  it('should have a name attribute with the given name value', () => {
    render(<NumberInput {...defaultProps} />);
    expect(screen.getByRole('spinbutton')).toHaveAttribute(
      'name',
      defaultProps.name,
    );
  });

  it('should have a value attribute with the given value', () => {
    render(<NumberInput {...defaultProps} />);
    expect(screen.getByRole('spinbutton')).toHaveAttribute(
      'value',
      defaultProps.value.toString(),
    );
  });

  describe('User events', () => {
    it('should become focused when the user tabs on it', async () => {
      const user = userEvent.setup();
      render(<NumberInput {...defaultProps} />);
      expect(screen.getByRole('spinbutton')).not.toHaveFocus();

      await user.tab();
      expect(screen.getByRole('spinbutton')).toHaveFocus();
    });

    it('should loose focus when the user tabs away from it', async () => {
      const user = userEvent.setup();
      render(<NumberInput {...defaultProps} />);

      await user.tab();
      await user.tab();

      expect(screen.getByRole('spinbutton')).not.toHaveFocus();
    });

    it('should call the onChange callback with the current value when the user enters a value in the input field', async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();
      const numberToInput = defaultProps.value;

      render(
        <NumberInput
          {...defaultProps}
          onChange={onChangeMock}
          value={undefined}
        />,
      );
      expect(onChangeMock).not.toHaveBeenCalled();

      const testInputElement = screen.getByRole('spinbutton');
      await user.type(testInputElement, numberToInput.toString());
      expect(testInputElement).toHaveValue(numberToInput);
      expect(onChangeMock).toHaveBeenCalledWith(numberToInput);
    });
  });
});
