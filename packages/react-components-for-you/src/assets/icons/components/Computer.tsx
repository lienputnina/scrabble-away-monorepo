import type { FC } from 'react';

import { IconProps, DefaultPropValues } from '../types';

export const Computer: FC<IconProps> = ({
  size = DefaultPropValues.SIZE,
  fill = DefaultPropValues.FILL,
}) => (
  <div style={{ width: size, height: size }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
      <path
        fill={fill}
        d="M80 936q-17 0-28.5-11.5T40 896q0-17 11.5-28.5T80 856h800q17 0 28.5 11.5T920 896q0 17-11.5 28.5T880 936H80Zm80-120q-33 0-56.5-23.5T80 736V296q0-33 23.5-56.5T160 216h640q33 0 56.5 23.5T880 296v440q0 33-23.5 56.5T800 816H160Zm0-80h640V296H160v440Zm0 0V296v440Z"
      />
    </svg>
  </div>
);
