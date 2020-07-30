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

const IconToggleLeft: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M874.666667 800H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h725.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM149.333333 224h725.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32zM341.333333 480c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h512c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H341.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M275.2 684.8c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8l-128-128 125.866667-125.866667c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-149.333333 149.333334c-12.8 12.8-12.8 32 0 44.8l149.333333 149.333333z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconToggleLeft.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconToggleLeft) : IconToggleLeft;
