import type { FC } from 'react';

import { IconProps, DefaultPropValues } from '../types';

export const Done: FC<IconProps> = ({
  size = DefaultPropValues.SIZE,
  fill = DefaultPropValues.FILL,
}) => (
  <div style={{ width: size, height: size }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
      <path
        fill={fill}
        d="M382 816 154 588l57-57 171 171 367-367 57 57-424 424Z"
      />
    </svg>
  </div>
);
