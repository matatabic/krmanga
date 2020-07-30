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

const IconToggleRight: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M874.666667 800H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h725.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM149.333333 224h725.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32zM149.333333 544h512c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M748.8 339.2c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l125.866667 125.866667-125.866667 125.866666c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466666-8.533334l149.333334-149.333333c12.8-12.8 12.8-32 0-44.8l-151.466667-147.2z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconToggleRight.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconToggleRight) : IconToggleRight;
