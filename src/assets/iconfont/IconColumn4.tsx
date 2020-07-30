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

const IconColumn4: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M874.666667 117.333333H149.333333C108.8 117.333333 74.666667 151.466667 74.666667 192v640c0 40.533333 34.133333 74.666667 74.666666 74.666667h725.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V192c0-40.533333-34.133333-74.666667-74.666666-74.666667z m-330.666667 64h128v661.333334h-128v-661.333334z m-64 661.333334h-128v-661.333334h128v661.333334z m-341.333333-10.666667V192c0-6.4 4.266667-10.666667 10.666666-10.666667h138.666667v661.333334H149.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667z m746.666666 0c0 6.4-4.266667 10.666667-10.666666 10.666667h-138.666667v-661.333334H874.666667c6.4 0 10.666667 4.266667 10.666666 10.666667v640z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconColumn4.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconColumn4) : IconColumn4;
