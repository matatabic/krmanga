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

const IconMic: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M516.266667 657.066667c78.933333 0 142.933333-64 142.933333-142.933334V217.6a142.933333 142.933333 0 0 0-285.866667 0v296.533333c0 78.933333 64 142.933333 142.933334 142.933334z m-78.933334-439.466667c0-42.666667 36.266667-78.933333 78.933334-78.933333s78.933333 36.266667 78.933333 78.933333v296.533333c0 42.666667-36.266667 78.933333-78.933333 78.933334s-78.933333-36.266667-78.933334-78.933334V217.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M774.4 409.6c-17.066667 0-32 14.933333-32 32v74.666667c0 125.866667-102.4 228.266667-228.266667 228.266666S288 640 288 514.133333v-74.666666c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v74.666666c0 149.333333 113.066667 273.066667 260.266667 290.133334v85.333333h-117.333334c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h296.533334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-117.333334v-85.333333c145.066667-14.933333 260.266667-140.8 260.266667-290.133334v-74.666666c0-17.066667-12.8-29.866667-32-29.866667z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconMic.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconMic) : IconMic;
