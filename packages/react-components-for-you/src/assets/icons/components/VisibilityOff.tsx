import type { FC } from 'react';

import { IconProps, DefaultPropValues } from '../types';

export const VisibilityOff: FC<IconProps> = ({
  size = DefaultPropValues.SIZE,
  fill = DefaultPropValues.FILL,
}) => (
  <div style={{ width: size, height: size }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
      <path
        fill={fill}
        d="m644 628-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660 556q0 20-4 37.5T644 628Zm128 126-58-56q38-29 67.5-63.5T832 556q-50-101-143.5-160.5T480 336q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920 556q-23 59-60.5 109.5T772 754Zm20 246L624 834q-35 11-70.5 16.5T480 856q-151 0-269-83.5T40 556q21-53 53-98.5t73-81.5L56 264l56-56 736 736-56 56ZM222 432q-29 26-53 57t-41 67q50 101 143.5 160.5T480 776q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300 556q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"
      />
    </svg>
  </div>
);
