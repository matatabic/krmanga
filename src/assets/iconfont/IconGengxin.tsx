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

let IconGengxin: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M823.096 173.72C740.016 89.32 629.536 42.816 512.016 42.816 269.576 42.816 72.32 243.072 72.32 489.184c0 177.44 103.056 335.432 258.008 406.704l-75.072 26.848a30.112 30.112 0 1 0 20.296 56.68l144.696-51.736a30.08 30.08 0 0 0 18.192-38.488l-0.184-0.536a30.176 30.176 0 0 0-4.536-12.704l-46.96-131.392a30.04 30.04 0 0 0-38.488-18.192 30.08 30.08 0 0 0-18.192 38.488l27.624 77.32c-135.12-61.088-225.176-198.488-225.176-352.984 0-212.928 170.24-386.168 379.496-386.168 101.296 0 196.488 40.104 268.16 112.944 71.792 72.968 111.296 169.984 111.296 273.224 0 149.048-85.664 286.36-218.304 349.776a30.12 30.12 0 0 0-14.168 40.16 30.136 30.136 0 0 0 40.16 14.168c153.4-73.376 252.528-232.008 252.528-404.104 0.04-119.12-45.64-231.16-128.6-315.472z"
        fill={getIconColor(color, 0, '#888888')}
      />
    </Svg>
  );
};

IconGengxin.defaultProps = {
  size: 18,
};

IconGengxin = React.memo ? React.memo(IconGengxin) : IconGengxin;

export default IconGengxin;
