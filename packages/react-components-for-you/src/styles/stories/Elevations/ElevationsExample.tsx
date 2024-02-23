import classNames from 'classnames';
import type { FC } from 'react';

import './ElevationsExample.scss';

export enum ElevationLevel {
  ONE = 'level-1',
  TWO = 'level-2',
  THREE = 'level-3',
  FOUR = 'level-4',
}

export interface ElevationsExampleProps {
  level: ElevationLevel;
}

const getElevationValue = (level: ElevationLevel) => {
  switch (level) {
    case 'level-1':
      return '1';
    case 'level-2':
      return '2';
    case 'level-3':
      return '3';
    case 'level-4':
      return '4';
    default:
      return 'no value found';
  }
};

export const ElevationsExample: FC<ElevationsExampleProps> = ({ level }) => (
  <div className={classNames('elevation', `elevation-${level}`)}>
    <p className="elevation-text">{`Elevation level: ${getElevationValue(
      level,
    )}`}</p>
  </div>
);
