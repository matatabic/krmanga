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

const IconFavoriteFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M465.066667 89.6l-104.533334 213.333333-234.666666 34.133334c-10.666667 2.133333-21.333333 6.4-29.866667 14.933333l-2.133333 2.133333c-17.066667 21.333333-17.066667 53.333333 4.266666 72.533334l170.666667 166.4-40.533333 234.666666c-2.133333 10.666667 0 23.466667 6.4 34.133334l2.133333 2.133333c14.933333 23.466667 44.8 32 70.4 19.2l211.2-110.933333 211.2 110.933333c10.666667 6.4 21.333333 6.4 34.133333 6.4h4.266667c27.733333-6.4 44.8-32 40.533333-61.866667l-40.533333-234.666666 170.666667-166.4c8.533333-8.533333 12.8-19.2 14.933333-29.866667v-4.266667c2.133333-27.733333-17.066667-53.333333-44.8-57.6l-234.666667-34.133333-104.533333-213.333333c-14.933333-8.533333-23.466667-17.066667-34.133333-23.466667-25.6-12.8-57.6-2.133333-70.4 25.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFavoriteFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconFavoriteFilling) : IconFavoriteFilling;
