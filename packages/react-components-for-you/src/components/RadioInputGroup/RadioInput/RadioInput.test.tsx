import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioInput } from './RadioInput';

describe('RadioInput', () => {
  const defaultProps = {
    groupId: 'group-test-id',
    optionId: 'option-test-id',
    label: 'Test label',
    value: 'Test value',
    name: 'Test name',
    onChange: () => {},
  };

  it('should render without crashing', () => {
    render(<RadioInput {...defaultProps} />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('should display the provided label', () => {
    const label = 'Test label';
    render(<RadioInput {...defaultProps} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should not be checked if isChecked is not provided', () => {
    render(<RadioInput {...defaultProps} />);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('should be checked if isChecked is provided', () => {
    render(<RadioInput {...defaultProps} isChecked />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  describe('User events', () => {
    it('should call the provided onChange callback on user click', async () => {
      const user = userEvent.setup();
      const onChangeMock = jest.fn();
      render(<RadioInput {...defaultProps} onChange={onChangeMock} />);
      expect(onChangeMock).not.toHaveBeenCalled();

      await user.click(screen.getByRole('radio'));
      expect(onChangeMock).toHaveBeenCalled();
    });

    it('should return the provided id and value from the provided onChange callback on user click', async () => {
      const user = userEvent.setup();
      const id = 'test id';
      const value = 'Test Value';
      const onChangeMock = jest.fn();
      render(
        <RadioInput
          {...defaultProps}
          optionId={id}
          value={value}
          onChange={onChangeMock}
        />,
      );

      await user.click(screen.getByRole('radio'));
      expect(onChangeMock).toHaveBeenCalledWith(id, value);
    });
  });
});
