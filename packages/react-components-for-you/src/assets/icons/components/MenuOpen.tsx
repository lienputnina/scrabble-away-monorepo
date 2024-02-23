import type { FC } from 'react';

import { IconProps, DefaultPropValues } from '../types';

export const MenuOpen: FC<IconProps> = ({
  size = DefaultPropValues.SIZE,
  fill = DefaultPropValues.FILL,
}) => (
  <div style={{ width: size, height: size }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
      <path
        fill={fill}
        d="M120 816v-80h520v80H120Zm664-40L584 576l200-200 56 56-144 144 144 144-56 56ZM120 616v-80h400v80H120Zm0-200v-80h520v80H120Z"
      />
    </svg>
  </div>
);
