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

const IconSignOut: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M919.466667 488.533333l-149.333334-149.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l93.866667 93.866667H522.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h296.533333L725.333333 635.733333c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466667-8.533334l149.333333-149.333333c8.533333-8.533333 8.533333-29.866667-2.133333-42.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M832 714.666667c-17.066667 0-32 14.933333-32 32v106.666666c0 6.4-4.266667 10.666667-10.666667 10.666667H234.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h554.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v106.666666c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667H234.666667C194.133333 96 160 130.133333 160 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-106.666666c0-17.066667-14.933333-32-32-32z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconSignOut.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconSignOut) : IconSignOut;
