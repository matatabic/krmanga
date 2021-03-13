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

let IconSorting: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M273.066667 405.333333h475.733333c10.666667 0 21.333333-4.266667 29.866667-12.8 17.066667-17.066667 17.066667-42.666667 0-59.733333L541.866667 93.866667c-17.066667-17.066667-42.666667-17.066667-59.733334 0L243.2 332.8c-8.533333 8.533333-12.8 19.2-12.8 29.866667 0 23.466667 19.2 42.666667 42.666667 42.666666zM750.933333 618.666667H273.066667c-10.666667 0-21.333333 4.266667-29.866667 12.8-17.066667 17.066667-17.066667 42.666667 0 59.733333l238.933333 238.933333c17.066667 17.066667 42.666667 17.066667 59.733334 0l238.933333-238.933333c8.533333-8.533333 12.8-19.2 12.8-29.866667 0-23.466667-19.2-42.666667-42.666667-42.666666z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconSorting.defaultProps = {
  size: 18,
};

IconSorting = React.memo ? React.memo(IconSorting) : IconSorting;

export default IconSorting;
