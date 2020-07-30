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

const IconClockFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 74.666667c241.066667 0 437.333333 196.266667 437.333333 437.333333S753.066667 949.333333 512 949.333333 74.666667 753.066667 74.666667 512 270.933333 74.666667 512 74.666667z m0 170.666666c-17.066667 0-32 14.933333-32 32V518.4c2.133333 10.666667 8.533333 21.333333 19.2 25.6l170.666667 81.066667 2.133333 2.133333c14.933333 6.4 32-2.133333 40.533333-17.066667l2.133334-2.133333c6.4-14.933333-2.133333-32-17.066667-40.533333l-151.466667-70.4V275.2c-4.266667-17.066667-17.066667-29.866667-34.133333-29.866667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconClockFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconClockFilling) : IconClockFilling;
