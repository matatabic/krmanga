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

const IconDeclineFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M635.733333 341.333333c19.2 0 32 12.8 32 29.866667v236.8h155.733334c12.8 0 25.6 8.533333 27.733333 21.333333 2.133333 4.266667 2.133333 6.4 2.133333 10.666667 0 8.533333-6.4 19.2-12.8 25.6L529.066667 910.933333c-12.8 8.533333-27.733333 8.533333-40.533334 0L181.333333 663.466667c-8.533333-8.533333-12.8-21.333333-8.533333-34.133334 2.133333-12.8 14.933333-21.333333 27.733333-21.333333h151.466667V371.2c0-19.2 12.8-29.866667 34.133333-29.866667h249.6z m-6.4-128c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32h-234.666666c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h234.666666z m0-106.666666c17.066667 0 32 14.933333 32 32S646.4 170.666667 629.333333 170.666667h-234.666666c-17.066667 0-32-14.933333-32-32S377.6 106.666667 394.666667 106.666667h234.666666z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconDeclineFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconDeclineFilling) : IconDeclineFilling;
