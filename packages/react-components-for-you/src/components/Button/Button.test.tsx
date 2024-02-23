import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button, ButtonVariant } from './Button';

describe('Button', () => {
  const children = '';
  it('Renders without crashing ', () => {
    render(<Button>{children}</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should display the provided child component', () => {
    const childText = 'Button child';
    const childComponent = <p>{childText}</p>;
    render(<Button>{childComponent}</Button>);
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('calls the provided onClick callback when the user clicked the button', async () => {
    const user = userEvent.setup();
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock} />);
    expect(onClickMock).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalled();
  });

  describe('Button variants', () => {
    Object.entries(ButtonVariant).forEach(([variantName, variantValue]) => {
      it(`should have the provided button variant ${variantName}`, () => {
        const { container } = render(
          <Button variant={variantValue}>{children}</Button>,
        );
        expect(
          container.getElementsByClassName(variantValue)[0],
        ).toBeInTheDocument();
      });
    });
  });
});
