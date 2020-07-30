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

const IconTaskFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M808.533333 138.666667l-2.133333 2.133333-2.133333 2.133333c-4.266667 2.133333-10.666667 6.4-19.2 8.533334-23.466667 10.666667-57.6 14.933333-102.4 14.933333-38.4 0-72.533333-8.533333-149.333334-32L509.866667 128c-74.666667-23.466667-113.066667-32-157.866667-32-51.2 0-93.866667 8.533333-125.866667 21.333333-21.333333 8.533333-34.133333 17.066667-42.666666 25.6-4.266667 4.266667-8.533333 12.8-8.533334 21.333334V896c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V616.533333c4.266667-2.133333 6.4-4.266667 10.666667-6.4 23.466667-10.666667 57.6-14.933333 102.4-14.933333h8.533333c36.266667 2.133333 70.4 8.533333 140.8 32l34.133334 10.666667c70.4 21.333333 106.666667 29.866667 151.466666 29.866666 51.2 0 93.866667-8.533333 125.866667-21.333333 21.333333-8.533333 34.133333-17.066667 42.666667-25.6 6.4-6.4 8.533333-14.933333 8.533333-23.466667V164.266667c-2.133333-27.733333-34.133333-42.666667-55.466667-25.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconTaskFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconTaskFilling) : IconTaskFilling;
