import type { FC } from 'react';
import classNames from 'classnames';

import variables from '../../styles/scss/variables.module.scss';
import './Text.scss';

const { prefix } = variables;

export enum TextStyle {
  REGULAR = 'regular',
  BOLD = 'bold',
  ITALIC = 'italic',
}

export enum TextAlignment {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export interface TextProps extends React.HTMLProps<HTMLParagraphElement> {
  textStyle?: TextStyle;
  alignment?: TextAlignment;
}

export const Text: FC<TextProps> = ({
  textStyle = TextStyle.REGULAR,
  children,
  alignment = TextAlignment.LEFT,
  className,
  ...remainingProps
}) => (
  <p
    className={classNames(`${prefix}-text`, textStyle, alignment, className)}
    {...remainingProps}
  >
    {children}
  </p>
);
