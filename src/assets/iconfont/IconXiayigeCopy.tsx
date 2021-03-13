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

let IconXiayigeCopy: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M960 960.00000001l-64 0 0-960L960 1e-8 960 960.00000001z m-283.52-480.06400001L233.6 914.36800001 278.464 960.00000001 768 479.80800001 276.416 1e-8l-44.736 45.696 444.8 434.23999999z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXiayigeCopy.defaultProps = {
  size: 18,
};

IconXiayigeCopy = React.memo ? React.memo(IconXiayigeCopy) : IconXiayigeCopy;

export default IconXiayigeCopy;
