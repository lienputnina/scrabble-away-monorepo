import classNames from 'classnames';
import type { FC } from 'react';

import './MarginsExample.scss';

export enum MarginSize {
  EXTRA_SMALL = 'xs',
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
  EXTRA_LARGE = 'xl',
}

export interface MarginsExampleProps {
  size: MarginSize;
}

const getMarginSizeValue = (size: MarginSize): string => {
  switch (size) {
    case 'xs':
      return '0.25rem';
    case 'sm':
      return '0.5rem';
    case 'md':
      return '0.75rem';
    case 'lg':
      return '1rem';
    case 'xl':
      return '1.25rem';
    default:
      return 'no value found';
  }
};

const renderMarginExampleContent = (size: MarginSize) => (
  <div className={classNames('margin', `margin-${size}`)}>
    <p className="margin-text">{`Margin size: ${getMarginSizeValue(size)}`}</p>
  </div>
);

export const MarginsExample: FC<MarginsExampleProps> = ({ size }) => (
  <main className="margin-main">
    <div>{renderMarginExampleContent(size)}</div>
    <div>{renderMarginExampleContent(size)}</div>
  </main>
);
