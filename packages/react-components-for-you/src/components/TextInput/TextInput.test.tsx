import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from './TextInput';

describe('Text input', () => {
  const defaultProps = {
    id: 'Test id',
    label: 'Test text input',
    name: 'Test name',
    value: 'Some text input',
    onChange: () => {},
  };

  it('should render without crashing', () => {
    render(<TextInput {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should have a label with the given label value', () => {
    render(<TextInput {...defaultProps} />);
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  it('should have a name attribute with the given name value', () => {
    render(<TextInput {...defaultProps} />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'name',
      defaultProps.name,
    );
  });

  it('should have a value attribute with the given value', () => {
    render(<TextInput {...defaultProps} />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'value',
      defaultProps.value.toString(),
    );
  });

  describe('User events', () => {
    it('should become focused when the user tabs on it', async () => {
      const user = userEvent.setup();
      render(<TextInput {...defaultProps} />);
      expect(screen.getByRole('textbox')).not.toHaveFocus();

      await user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('should loose focus when the user tabs away from it', async () => {
      const user = userEvent.setup();
      render(<TextInput {...defaultProps} />);

      await user.tab();
      await user.tab();

      expect(screen.getByRole('textbox')).not.toHaveFocus();
    });

    it('should call the onChange callback with the new value when the user enters a value in the input field', async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();
      const textToInput = defaultProps.value;
      render(
        <TextInput
          {...defaultProps}
          onChange={onChangeMock}
          value={undefined}
        />,
      );
      expect(onChangeMock).not.toHaveBeenCalled();
      const testTextInputElement = screen.getByRole('textbox');
      await user.type(testTextInputElement, textToInput);
      expect(testTextInputElement).toHaveValue(textToInput);
      expect(onChangeMock).toHaveBeenCalledWith(textToInput);
    });
  });
});
