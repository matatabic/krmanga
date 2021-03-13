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

let IconShangbian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M601.500115 1024H421.500115a100 100 0 0 1-100-100V542H141.500115a40 40 0 0 1-32-64L438.500115 38h1a100 100 0 0 1 78-38h1a100 100 0 0 1 78 38h1l317 440a40 40 0 0 1-32 63H701.500115v383a100 100 0 0 1-100 100zM221.500115 462h140a40 40 0 0 1 40 40v422a20 20 0 0 0 20 20h180a20 20 0 0 0 20-20V502a40 40 0 0 1 40-40h142L532.500115 87a20 20 0 0 0-30 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconShangbian.defaultProps = {
  size: 18,
};

IconShangbian = React.memo ? React.memo(IconShangbian) : IconShangbian;

export default IconShangbian;
