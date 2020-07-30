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

const IconHomeFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M925.866667 396.8l-32-27.733333c-78.933333-66.133333-185.6-157.866667-320-273.066667l-12.8-10.666667C533.333333 61.866667 490.666667 61.866667 462.933333 85.333333l-151.466666 130.133334c-85.333333 72.533333-155.733333 132.266667-211.2 179.2-17.066667 12.8-25.6 32-25.6 53.333333v4.266667c2.133333 38.4 34.133333 66.133333 70.4 66.133333H192v358.4c0 29.866667 23.466667 53.333333 53.333333 53.333333h164.266667c27.733333-2.133333 49.066667-25.6 49.066667-53.333333v-185.6c0-12.8 8.533333-21.333333 21.333333-21.333333h64c12.8 0 21.333333 8.533333 21.333333 21.333333v185.6c0 29.866667 23.466667 53.333333 53.333334 53.333333h164.266666c27.733333-2.133333 49.066667-25.6 49.066667-53.333333V518.4h46.933333c38.4 0 70.4-32 70.4-70.4 0-21.333333-8.533333-38.4-23.466666-51.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconHomeFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconHomeFilling) : IconHomeFilling;
