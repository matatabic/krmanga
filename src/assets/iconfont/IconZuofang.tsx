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

let IconZuofang: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M382.4 512l418.88-418.88L708.16 0l-512 512 512 512 93.12-93.12z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconZuofang.defaultProps = {
  size: 18,
};

IconZuofang = React.memo ? React.memo(IconZuofang) : IconZuofang;

export default IconZuofang;
