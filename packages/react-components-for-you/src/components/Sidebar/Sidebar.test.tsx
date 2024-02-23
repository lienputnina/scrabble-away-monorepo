import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  Sidebar,
  SidebarPosition,
  SidebarProps,
  DefaultButtonAriaLabels,
} from './Sidebar';

describe('Sidebar', () => {
  const defaultProps: SidebarProps = {
    children: <span>Default test child</span>,
    title: 'Default test title',
    onOpenButtonClick: () => {},
    onCloseButtonClick: () => {},
  };

  const renderSidebar = (props?: Partial<SidebarProps>): HTMLElement => {
    render(<Sidebar {...defaultProps} {...props} />);
    return screen.getByRole('complementary');
  };

  const findControlButton = (buttonAriaLabel: string) =>
    screen
      .getAllByRole('button')
      .find((button) => button.getAttribute('aria-label') === buttonAriaLabel);

  it('renders without crashing', () => {
    expect(renderSidebar()).toBeInTheDocument();
  });

  it('has a title', () => {
    const { title } = defaultProps;

    renderSidebar({ title });
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('has children', () => {
    const testText = 'Test content';
    const children = <span>{testText}</span>;

    renderSidebar({ children });
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('has footer if provided', () => {
    const testText = 'Test footer';
    const footer = <span>{testText}</span>;

    renderSidebar({ children: footer });
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('has an visible `open` button when it is closed', () => {
    renderSidebar();
    const openButton = findControlButton(DefaultButtonAriaLabels.open);

    expect(openButton).toBeVisible();
  });

  it('has a `close` button when it is open', () => {
    renderSidebar({ isOpen: true });
    const closeButton = findControlButton(DefaultButtonAriaLabels.close);

    expect(closeButton).toBeVisible();
  });

  it('is closed by default', () => {
    expect(renderSidebar()).toHaveClass('hidden');
  });

  it('is closed if "isOpen=false" prop is provided', () => {
    expect(renderSidebar({ isOpen: false })).toHaveClass('hidden');
  });

  it('is open if "isOpen=true" prop is provided', () => {
    expect(renderSidebar({ isOpen: true })).not.toHaveClass('hidden');
  });

  it('opens on the left by default', () => {
    expect(renderSidebar()).toHaveClass(SidebarPosition.LEFT);
  });

  it(`opens on the left if position="${SidebarPosition.LEFT}}" prop is provided`, () => {
    expect(renderSidebar({ position: SidebarPosition.LEFT })).toHaveClass(
      SidebarPosition.LEFT,
    );
  });

  it(`opens on the right if position="${SidebarPosition.RIGHT}" prop is provided`, () => {
    expect(renderSidebar({ position: SidebarPosition.RIGHT })).toHaveClass(
      SidebarPosition.RIGHT,
    );
  });

  describe('User events', () => {
    const onOpenButtonClickMock = jest.fn();
    const onCloseButtonClickMock = jest.fn();

    it('calls the provided onOpenButtonClick handler when the "open" button is clicked', async () => {
      const user = userEvent.setup();

      renderSidebar({ onOpenButtonClick: onOpenButtonClickMock });
      expect(onOpenButtonClickMock).not.toHaveBeenCalled();

      await user.click(findControlButton(DefaultButtonAriaLabels.open)!);
      expect(onOpenButtonClickMock).toHaveBeenCalled();
    });

    it('calls the provided onCloseButtonClick handler the "close" button is clicked', async () => {
      const user = userEvent.setup();

      renderSidebar({ onCloseButtonClick: onCloseButtonClickMock });
      expect(onCloseButtonClickMock).not.toHaveBeenCalled();

      await user.click(findControlButton(DefaultButtonAriaLabels.close)!);
      expect(onCloseButtonClickMock).toHaveBeenCalled();
    });
  });
});
