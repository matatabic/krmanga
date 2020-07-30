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

const IconCapsUnlockFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M170.666667 928c-40.533333 0-74.666667-34.133333-74.666667-74.666667V170.666667c0-40.533333 34.133333-74.666667 74.666667-74.666667h682.666666c40.533333 0 74.666667 34.133333 74.666667 74.666667v682.666666c0 40.533333-34.133333 74.666667-74.666667 74.666667H170.666667zM439.466667 725.333333h147.2c12.8 0 21.333333-6.4 21.333333-19.2v-204.8h89.6c6.4 0 14.933333-6.4 17.066667-12.8 2.133333-6.4 0-14.933333-6.4-19.2l-183.466667-145.066666c-6.4-6.4-17.066667-6.4-23.466667 0L315.733333 469.333333c-4.266667 4.266667-6.4 8.533333-6.4 14.933334 0 2.133333 0 4.266667 2.133334 6.4 2.133333 6.4 8.533333 12.8 17.066666 12.8h91.733334v204.8c0 10.666667 6.4 17.066667 19.2 17.066666z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconCapsUnlockFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconCapsUnlockFilling) : IconCapsUnlockFilling;
