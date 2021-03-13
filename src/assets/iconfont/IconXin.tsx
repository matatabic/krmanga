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

let IconXin: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 233.6C362.7 9.6 64 140.7 64 384.7c0 165.1 149.2 282.8 261.3 371.5C442 848.5 474.7 868.3 512 905.6c37.3-37.3 68.5-59.1 186.7-149.3C812.5 669.4 960 548 960 382.9c0-242.2-298.7-373.3-448-149.3z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXin.defaultProps = {
  size: 18,
};

IconXin = React.memo ? React.memo(IconXin) : IconXin;

export default IconXin;
