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

let IconSelectBold: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M883.2 247.466667c-17.066667-17.066667-44.8-17.066667-59.733333 0L409.6 665.6l-209.066667-204.8c-17.066667-17.066667-44.8-17.066667-59.733333 0-17.066667 17.066667-17.066667 44.8 0 59.733333l238.933333 234.666667c8.533333 8.533333 19.2 12.8 29.866667 12.8 10.666667 0 21.333333-4.266667 29.866667-12.8l443.733333-448c17.066667-17.066667 17.066667-42.666667 0-59.733333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconSelectBold.defaultProps = {
  size: 18,
};

IconSelectBold = React.memo ? React.memo(IconSelectBold) : IconSelectBold;

export default IconSelectBold;
