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

let IconGuanggao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M 902.624 806.016 H 121.376 c -13.728 0 -24.96 -11.232 -24.96 -24.96 V 303.904 C 96.416 242.336 146.752 192 208.32 192 h 607.36 c 61.568 0 111.904 50.336 111.904 111.904 v 477.152 c 0 13.728 -11.232 24.96 -24.96 24.96 Z m 0 86.112 H 121.376 c -13.728 0 -24.96 -11.232 -24.96 -24.96 c 0 -13.728 11.232 -24.96 24.96 -24.96 h 780.832 c 13.728 0 24.96 11.232 24.96 24.96 c 0.416 13.728 -10.816 24.96 -24.544 24.96 Z m -617.76 -292.032 c 0 0.832 -0.416 1.664 -1.248 2.912 v 9.568 c 0.832 14.56 9.152 21.632 24.544 21.632 c 12.48 0 21.216 -5.408 25.792 -16.224 l 10.816 -32.448 h 95.68 l 9.568 32.448 c 3.744 10.816 12.064 16.224 25.792 16.224 c 15.392 0 23.712 -6.656 24.544 -20.384 c -1.248 -2.912 -2.08 -7.488 -2.912 -13.728 l -67.808 -188.448 c -7.904 -17.888 -20.8 -27.456 -37.856 -28.288 c -17.888 0.832 -30.368 10.4 -36.608 28.288 l -70.304 188.448 Z m 107.328 -162.656 l 32.448 100.256 H 359.744 l 32.448 -100.256 Z m 141.856 170.976 c 0 16.224 9.152 24.544 27.04 25.376 h 59.488 c 75.296 -3.744 114.816 -43.68 119.392 -120.64 c -3.328 -80.288 -44.096 -122.304 -121.888 -126.048 h -58.24 c -16.224 1.664 -24.96 10.4 -25.792 25.792 v 195.52 Z m 51.584 -173.888 h 31.2 c 44.928 0.832 68.224 26.624 69.056 77.376 c -2.496 48.672 -24.128 73.632 -64.896 74.464 h -35.36 v -151.84 Z"
        fill={getIconColor(color, 0, '#868686')}
      />
    </Svg>
  );
};

IconGuanggao.defaultProps = {
  size: 18,
};

IconGuanggao = React.memo ? React.memo(IconGuanggao) : IconGuanggao;

export default IconGuanggao;
