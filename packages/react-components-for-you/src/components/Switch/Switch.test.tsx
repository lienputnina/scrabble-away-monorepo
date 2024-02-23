import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch, SwitchProps, SwitchLabelPosition } from './Switch';
import { KeyCodes, SPACE_SYMBOL } from '../../constants/KeyCodes';

describe('Switch component', () => {
  const defaultProps: SwitchProps = {
    id: 'test-id',
    label: 'Test label',
    isChecked: false,
    positiveState: 'On',
    negativeState: 'Off',
    labelPosition: SwitchLabelPosition.TOP,
    onChange: () => {},
  };

  it('should render without crashing', () => {
    render(<Switch {...defaultProps} />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  describe('Switch label positions', () => {
    Object.entries(SwitchLabelPosition).forEach(
      ([positionName, positionValue]) => {
        it(`should have the provided label position ${positionName}`, () => {
          const { container } = render(
            <Switch {...defaultProps} labelPosition={positionValue} />,
          );
          expect(
            container.getElementsByClassName(positionValue)[0],
          ).toBeInTheDocument();
        });
      },
    );
  });

  describe('User events', () => {
    describe('Switch focus state', () => {
      it('should become focused when the user tabs on it', async () => {
        const user = userEvent.setup();
        render(<Switch {...defaultProps} />);
        await user.tab();
        expect(screen.getByRole('switch')).toHaveFocus();
      });

      it('should loose focus when the user tabs away from it', async () => {
        const user = userEvent.setup();
        render(<Switch {...defaultProps} />);
        await user.tab();
        await user.tab();
        expect(screen.getByRole('switch')).not.toHaveFocus();
      });
    });
    describe('Toggling the switch', () => {
      describe('With mouse', () => {
        it('should call the onChange callback with the new value when the user clicks on the switch', async () => {
          const user = userEvent.setup();
          const onChangeMock = jest.fn();
          const isChecked = true;

          render(
            <Switch
              {...defaultProps}
              onChange={onChangeMock}
              isChecked={isChecked}
            />,
          );
          expect(onChangeMock).not.toHaveBeenCalled();

          await user.click(screen.getByRole('switch'));
          expect(onChangeMock).toHaveBeenCalledWith(!isChecked);
        });
      });

      describe('With keyboard', () => {
        it(`should call the onChange callback with the new value when the user presses ${SPACE_SYMBOL}`, async () => {
          const user = userEvent.setup();
          const onChangeMock = jest.fn();
          const isChecked = true;

          render(
            <Switch
              {...defaultProps}
              onChange={onChangeMock}
              isChecked={isChecked}
            />,
          );
          expect(onChangeMock).not.toHaveBeenCalled();

          user.tab();
          await user.keyboard(SPACE_SYMBOL);
          expect(onChangeMock).toHaveBeenCalledWith(!isChecked);
        });

        it(`should call the onChange callback with the new value when the user presses ${KeyCodes.ENTER}`, async () => {
          const user = userEvent.setup();
          const onChangeMock = jest.fn();
          const isChecked = true;

          render(
            <Switch
              {...defaultProps}
              onChange={onChangeMock}
              isChecked={isChecked}
            />,
          );
          expect(onChangeMock).not.toHaveBeenCalled();

          user.tab();
          await user.keyboard(`{${KeyCodes.ENTER}}`);
          expect(onChangeMock).toHaveBeenCalledWith(!isChecked);
        });
      });
    });
  });
});
