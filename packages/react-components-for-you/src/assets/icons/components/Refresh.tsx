import type { FC } from 'react';

import { IconProps, DefaultPropValues } from '../types';

export const Refresh: FC<IconProps> = ({
  size = DefaultPropValues.SIZE,
  fill = DefaultPropValues.FILL,
}) => (
  <div style={{ width: size, height: size }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
      <path
        fill={fill}
        d="M480 896q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720 366V256h80v280H520v-80h168q-32-56-87.5-88T480 336q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"
      />
    </svg>
  </div>
);
