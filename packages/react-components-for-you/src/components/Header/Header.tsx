import type { FC, HTMLProps, ReactNode } from 'react';
import variables from '../../styles/scss/variables.module.scss';

import logoImage from '../../assets/img/logo-icon.png';

import './Header.scss';

const { prefix } = variables;

export interface HeaderProps extends HTMLProps<HTMLDivElement> {
  logoUrl?: string;
  children?: ReactNode;
  customLogo?: ReactNode;
}

export const Header: FC<HeaderProps> = ({
  logoUrl,
  children,
  customLogo,
  ...remainingProps
}) => (
  <header className={`${prefix}-header`} {...remainingProps}>
    <div id="logo">
      {customLogo || (
        <a href={logoUrl || '/'}>
          <img src={logoImage} alt="Scrabble logo" />
        </a>
      )}
    </div>
    {children}
  </header>
);
