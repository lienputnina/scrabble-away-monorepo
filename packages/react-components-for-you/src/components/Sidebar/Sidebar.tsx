import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import { Title, TitleLevel } from '../Title/Title';
import { Button, ButtonVariant } from '../Button/Button';
import { ChevronRight, Close } from '../../assets/icons';

import variables from '../../styles/scss/variables.module.scss';
import './Sidebar.scss';

const { prefix } = variables;

export enum SidebarPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum DefaultButtonAriaLabels {
  open = 'Open sidebar',
  close = 'Close sidebar',
}

export type ButtonAriaLabels = {
  open: string;
  close: string;
};

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  footer?: ReactNode;
  isOpen?: boolean;
  position?: SidebarPosition;
  buttonAriaLabels?: ButtonAriaLabels;
  onOpenButtonClick: () => void;
  onCloseButtonClick: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
  title,
  children,
  footer,
  isOpen,
  position = SidebarPosition.LEFT,
  buttonAriaLabels = DefaultButtonAriaLabels,
  onOpenButtonClick,
  onCloseButtonClick,
  className,
  ...remainingProps
}) => (
  <aside
    className={classNames(`${prefix}-sidebar`, position, className, {
      hidden: !isOpen,
    })}
    {...remainingProps}
  >
    <Button
      className="sidebar-open-button"
      variant={ButtonVariant.SECONDARY}
      aria-label={buttonAriaLabels.open}
      onClick={() => onOpenButtonClick()}
    >
      <ChevronRight />
    </Button>
    <div className="sidebar-wrapper">
      <div className="sidebar-header">
        <Button
          className="sidebar-close-button"
          variant={ButtonVariant.SECONDARY}
          aria-label={buttonAriaLabels.close}
          onClick={() => onCloseButtonClick()}
        >
          <Close />
        </Button>
        <div>
          <Title level={TitleLevel.TWO}>{title}</Title>
        </div>
      </div>
      <div className="sidebar-content">{children}</div>
      {footer && <div className="sidebar-footer">{footer}</div>}
    </div>
  </aside>
);
