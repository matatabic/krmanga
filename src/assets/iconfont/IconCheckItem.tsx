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

let IconCheckItem: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M853.333333 96H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667z m10.666667 757.333333c0 6.4-4.266667 10.666667-10.666667 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h682.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v682.666666z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M704 381.866667l-243.2 234.666666-117.333333-125.866666c-12.8-12.8-32-12.8-44.8-2.133334-12.8 12.8-12.8 32-2.133334 44.8l140.8 149.333334c6.4 6.4 14.933333 10.666667 23.466667 10.666666 8.533333 0 17.066667-4.266667 21.333333-8.533333l264.533334-256c12.8-12.8 12.8-32 0-44.8-10.666667-12.8-29.866667-14.933333-42.666667-2.133333z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconCheckItem.defaultProps = {
  size: 18,
};

IconCheckItem = React.memo ? React.memo(IconCheckItem) : IconCheckItem;

export default IconCheckItem;
