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

const IconElectronics: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M840.533333 117.333333H183.466667c-59.733333 0-108.8 49.066667-108.8 108.8v379.733334c0 59.733333 49.066667 108.8 108.8 108.8h232.533333v115.2H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h341.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-74.666667v-115.2h232.533333c59.733333 0 108.8-49.066667 108.8-108.8V226.133333c0-59.733333-49.066667-108.8-108.8-108.8zM544 829.866667h-64v-115.2h64v115.2z m341.333333-224c0 25.6-19.2 44.8-44.8 44.8H183.466667c-25.6 0-44.8-19.2-44.8-44.8V226.133333c0-25.6 19.2-44.8 44.8-44.8h657.066666c25.6 0 44.8 19.2 44.8 44.8v379.733334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconElectronics.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconElectronics) : IconElectronics;
