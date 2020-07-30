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

const IconStop: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667zM885.333333 512c0 85.333333-29.866667 164.266667-78.933333 228.266667l-533.333333-514.133334c64-55.466667 149.333333-87.466667 238.933333-87.466666 204.8 0 373.333333 168.533333 373.333333 373.333333z m-746.666666 0c0-91.733333 34.133333-174.933333 87.466666-241.066667l535.466667 516.266667c-66.133333 59.733333-153.6 98.133333-251.733333 98.133333-202.666667 0-371.2-168.533333-371.2-373.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconStop.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconStop) : IconStop;
