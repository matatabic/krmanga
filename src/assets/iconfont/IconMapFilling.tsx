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

const IconMapFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 74.666667c194.133333 0 352 160 352 354.133333 0 119.466667-64 236.8-168.533333 349.866667-36.266667 38.4-74.666667 72.533333-113.066667 104.533333-12.8 10.666667-25.6 21.333333-38.4 27.733333l-6.4 4.266667-8.533333 6.4c-10.666667 6.4-25.6 6.4-36.266667 0-2.133333-2.133333-4.266667-4.266667-8.533333-6.4l-12.8-8.533333c-8.533333-6.4-19.2-14.933333-29.866667-23.466667-38.4-32-76.8-66.133333-113.066667-104.533333-104.533333-110.933333-168.533333-230.4-168.533333-349.866667C160 234.666667 317.866667 74.666667 512 74.666667zM512 298.666667c-64 0-117.333333 53.333333-117.333333 117.333333S448 533.333333 512 533.333333s117.333333-53.333333 117.333333-117.333333S576 298.666667 512 298.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMapFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconMapFilling) : IconMapFilling;
