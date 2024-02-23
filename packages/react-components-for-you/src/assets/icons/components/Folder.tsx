import type { FC } from 'react';

import { IconProps, DefaultPropValues } from '../types';

export const Folder: FC<IconProps> = ({
  size = DefaultPropValues.SIZE,
  fill = DefaultPropValues.FILL,
}) => (
  <div style={{ width: size, height: size }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
      <path
        fill={fill}
        d="M160 896q-33 0-56.5-23.5T80 816V336q0-33 23.5-56.5T160 256h240l80 80h320q33 0 56.5 23.5T880 416v400q0 33-23.5 56.5T800 896H160Zm0-560v480h640V416H447l-80-80H160Zm0 0v480-480Z"
      />
    </svg>
  </div>
);
