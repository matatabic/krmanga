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

const IconChartPie: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M887.466667 642.133333c-17.066667-6.4-34.133333 0-42.666667 17.066667-64 151.466667-221.866667 243.2-386.133333 221.866667-164.266667-21.333333-294.4-149.333333-315.733334-313.6C119.466667 405.333333 209.066667 245.333333 358.4 179.2c17.066667-6.4 23.466667-25.6 17.066667-42.666667-6.4-17.066667-25.6-23.466667-42.666667-17.066666C155.733333 198.4 51.2 386.133333 78.933333 578.133333c27.733333 192 179.2 343.466667 371.2 369.066667 19.2 2.133333 36.266667 4.266667 55.466667 4.266667 170.666667 0 330.666667-102.4 398.933333-264.533334 6.4-17.066667-2.133333-36.266667-17.066666-44.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M814.933333 209.066667C727.466667 121.6 612.266667 74.666667 490.666667 74.666667c-17.066667 0-32 14.933333-32 32v426.666666c0 17.066667 14.933333 32 32 32h426.666666c17.066667 0 32-14.933333 32-32 0-121.6-46.933333-236.8-134.4-324.266666zM522.666667 501.333333V140.8c93.866667 6.4 179.2 46.933333 247.466666 115.2 66.133333 66.133333 106.666667 153.6 115.2 247.466667h-362.666666z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconChartPie.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconChartPie) : IconChartPie;
