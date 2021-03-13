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

let IconQiehuan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1222 1024" width={size} height={size} {...rest}>
      <Path
        d="M1043.26485333 633.71946667a38.62528 38.62528 0 0 1 4.02773333 52.6336l-1.63839999 1.92512-225.27999999 245.76c-23.29258667 25.3952-65.22197333 9.83040001-67.03786668-23.82506667L753.2544 907.94666667 753.2544 6.82666667a38.62528 38.62528 0 0 1 77.16864-2.34837334L830.53226668 6.82666667l-1e-8 801.81930666L988.70613333 636.09514667a38.62528 38.62528 0 0 1 52.6336-4.02773334l1.92512 1.6384z"
        fill={getIconColor(color, 0, '#303133')}
      />
      <Path
        d="M165.05514667 281.13578667a38.62528 38.62528 0 0 1-4.02773334-52.6336l1.6384-1.92512 225.28-245.76c23.29258667-25.3952 65.22197333-9.83040001 67.03786667 23.82506666L455.0656 6.90858667 455.0656 908.02858667a38.62528 38.62528 0 0 1-77.16864 2.34837333L377.78773333 908.02858667l0-801.81930666L219.61386667 278.76010666a38.62528 38.62528 0 0 1-52.6336 4.02773334l-1.92511999-1.6384z"
        fill={getIconColor(color, 1, '#FF6F26')}
      />
    </Svg>
  );
};

IconQiehuan.defaultProps = {
  size: 18,
};

IconQiehuan = React.memo ? React.memo(IconQiehuan) : IconQiehuan;

export default IconQiehuan;
