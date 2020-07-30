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

const IconImageText: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M819.2 96H204.8c-59.733333 0-108.8 49.066667-108.8 108.8v616.533333c0 59.733333 49.066667 108.8 108.8 108.8h616.533333c59.733333 0 108.8-49.066667 108.8-108.8V204.8c-2.133333-59.733333-51.2-108.8-110.933333-108.8z m44.8 723.2c0 23.466667-19.2 44.8-44.8 44.8H204.8c-23.466667 0-44.8-19.2-44.8-44.8V204.8c0-23.466667 19.2-44.8 44.8-44.8h616.533333c23.466667 0 44.8 19.2 44.8 44.8v614.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M298.666667 522.666667h128c29.866667 0 53.333333-23.466667 53.333333-53.333334v-128c0-29.866667-23.466667-53.333333-53.333333-53.333333h-128c-29.866667 0-53.333333 23.466667-53.333334 53.333333v128c0 29.866667 23.466667 53.333333 53.333334 53.333334z m10.666666-170.666667h106.666667v106.666667h-106.666667v-106.666667zM746.666667 437.333333h-170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h170.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM746.666667 629.333333H277.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h469.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconImageText.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconImageText) : IconImageText;
