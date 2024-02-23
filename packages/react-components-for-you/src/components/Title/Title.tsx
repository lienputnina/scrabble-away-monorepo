import type { FC } from 'react';
import classNames from 'classnames';

import variables from '../../styles/scss/variables.module.scss';
import './Title.scss';

const { prefix } = variables;

export enum TitleLevel {
  ONE = 'h1',
  TWO = 'h2',
  THREE = 'h3',
  FOUR = 'h4',
}

export enum TitleAlignment {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export interface TitleProps extends React.HTMLProps<HTMLHeadingElement> {
  level?: TitleLevel;
  alignment?: TitleAlignment;
}

export const Title: FC<TitleProps> = ({
  level = TitleLevel.ONE,
  children,
  alignment = TitleAlignment.LEFT,
  className,
  ...remainingProps
}: TitleProps) => {
  switch (level) {
    case TitleLevel.TWO:
      return (
        <h2
          className={classNames(
            `${prefix}-title`,
            'heading-two',
            alignment,
            className,
          )}
          {...remainingProps}
        >
          {children}
        </h2>
      );

    case TitleLevel.THREE:
      return (
        <h3
          className={classNames(
            `${prefix}-title`,
            'heading-three',
            alignment,
            className,
          )}
          {...remainingProps}
        >
          {children}
        </h3>
      );

    case TitleLevel.FOUR:
      return (
        <h4
          className={classNames(
            `${prefix}-title`,
            'heading-four',
            alignment,
            className,
          )}
          {...remainingProps}
        >
          {children}
        </h4>
      );

    case TitleLevel.ONE:
    default:
      return (
        <h1
          className={classNames(
            `${prefix}-title`,
            'heading-one',
            alignment,
            className,
          )}
          {...remainingProps}
        >
          {children}
        </h1>
      );
  }
};
