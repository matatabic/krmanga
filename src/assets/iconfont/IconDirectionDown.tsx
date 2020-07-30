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

const IconDirectionDown: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M898.133333 512c-12.8-12.8-32-12.8-44.8-2.133333L544 800V149.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v650.666667L170.666667 509.866667c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l362.666667 341.333333c2.133333 2.133333 6.4 4.266667 8.533333 6.4 4.266667 2.133333 6.4 2.133333 10.666667 2.133334s8.533333 0 10.666666-2.133334c4.266667-2.133333 6.4-4.266667 8.533334-6.4l362.666666-341.333333c17.066667-12.8 19.2-32 6.4-44.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconDirectionDown.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconDirectionDown) : IconDirectionDown;
