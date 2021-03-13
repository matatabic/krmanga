/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconPaihang: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M248.94 863.1a35 35 0 0 1-35-35V704.47a35 35 0 1 1 70.08 0v123.59a35 35 0 0 1-35.08 35.04zM409.62 863.1a35 35 0 0 1-35-35V569.59a35 35 0 1 1 70.08 0v258.47a35 35 0 0 1-35.08 35.04zM570.37 863.1a35 35 0 0 1-35-35V611.4a35 35 0 0 1 70.08 0v216.66a35 35 0 0 1-35.08 35.04zM731.12 863.1a35 35 0 0 1-35-35V482.61a35 35 0 0 1 70.08 0v345.45a35 35 0 0 1-35.08 35.04zM248.94 572.67a35 35 0 0 1-29.36-54.13l133.1-204.41a77.53 77.53 0 0 1 117.84-14.37l88.69 82.8 11.09-1.09L702.79 199a35 35 0 0 1 56.66 41.2L627 422.66a77.34 77.34 0 0 1-55.36 31.62c-21.9 2.67-44.14-5.34-60.29-20.53l-88.62-82.8-11.29 1.37-133.14 204.4a34.94 34.94 0 0 1-29.36 15.95z"
        fill={getIconColor(color, 0, '#42494F')}
      />
      <Path
        d="M775.06 332.88a35 35 0 0 1-35-35V231h-66.9a35 35 0 1 1 0-70.08h101.9a35 35 0 0 1 35 35v101.9a35 35 0 0 1-35 35.06z"
        fill={getIconColor(color, 1, '#42494F')}
      />
    </Svg>
  );
};

IconPaihang.defaultProps = {
  size: 18,
};

IconPaihang = React.memo ? React.memo(IconPaihang) : IconPaihang;

export default IconPaihang;
