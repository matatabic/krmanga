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

const IconNewsFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 516.266667l388.266667-245.333334 49.066666-32c-6.4-34.133333-36.266667-59.733333-72.533333-59.733333H149.333333c-36.266667 0-66.133333 25.6-72.533333 57.6l46.933333 32L512 516.266667z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M949.333333 315.733333l-14.933333 10.666667-405.333333 256c-8.533333 6.4-21.333333 6.4-32 2.133333l-2.133334-2.133333-405.333333-256-14.933333-8.533333v452.266666c0 40.533333 34.133333 74.666667 74.666666 74.666667h725.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V315.733333z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconNewsFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconNewsFilling) : IconNewsFilling;
