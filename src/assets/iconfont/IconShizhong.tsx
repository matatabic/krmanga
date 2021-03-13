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

let IconShizhong: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M922.7 338.5c-22.5-53.1-54.6-100.8-95.5-141.7s-88.6-73.1-141.7-95.5c-55-23.3-113.4-35-173.5-35-60.2 0-118.5 11.8-173.5 35-53.1 22.5-100.8 54.6-141.7 95.5s-73.1 88.6-95.5 141.7c-23.3 55-35 113.4-35 173.5 0 60.2 11.8 118.5 35 173.5 22.5 53.1 54.6 100.8 95.5 141.7s88.6 73.1 141.7 95.5c55 23.3 113.4 35 173.5 35 60.2 0 118.5-11.8 173.5-35 53.1-22.5 100.8-54.6 141.7-95.5s73.1-88.6 95.5-141.7c23.3-55 35-113.4 35-173.5 0.1-60.2-11.7-118.5-35-173.5zM782 782c-72.1 72.1-168 111.8-270 111.8S314.2 854.1 242 782c-72.1-72.1-111.8-168-111.8-270S169.9 314.2 242 242c72.1-72.1 168-111.8 270-111.8S709.8 169.9 782 242c72.1 72.1 111.8 168 111.8 270S854.1 709.8 782 782z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M560.7 490.8V326.1c0-17.7-14.3-32-32-32s-32 14.3-32 32V498c0 1.7 0.1 3.3 0.4 4.9 0.2 6.4 2.3 12.9 6.5 18.4L665 734.2c6.3 8.3 15.9 12.7 25.5 12.7 6.7 0 13.5-2.1 19.3-6.5 14.1-10.7 16.9-30.7 6.2-44.8L560.7 490.8z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconShizhong.defaultProps = {
  size: 18,
};

IconShizhong = React.memo ? React.memo(IconShizhong) : IconShizhong;

export default IconShizhong;
