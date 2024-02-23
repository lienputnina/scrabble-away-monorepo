import type { FC } from 'react';

import { IconProps, DefaultPropValues } from '../types';

export const ExpandMore: FC<IconProps> = ({
  size = DefaultPropValues.SIZE,
  fill = DefaultPropValues.FILL,
}) => (
  <div style={{ width: size, height: size }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
      <path
        fill={fill}
        d="M480 711 240 471l56-56 184 184 184-184 56 56-240 240Z"
      />
    </svg>
  </div>
);
