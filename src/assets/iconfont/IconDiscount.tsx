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

let IconDiscount: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M874.666667 96H593.066667c-19.2 0-38.4 8.533333-53.333334 21.333333l-405.333333 405.333334c-29.866667 29.866667-29.866667 76.8 0 104.533333l260.266667 260.266667c14.933333 14.933333 32 21.333333 53.333333 21.333333s38.4-8.533333 53.333333-21.333333l405.333334-405.333334c14.933333-14.933333 21.333333-32 21.333333-53.333333V149.333333c0-29.866667-23.466667-53.333333-53.333333-53.333333z m-10.666667 334.933333c0 2.133333-2.133333 6.4-2.133333 8.533334l-405.333334 405.333333c-2.133333 2.133333-6.4 2.133333-8.533333 2.133333s-4.266667 0-8.533333-2.133333L181.333333 584.533333c-4.266667-4.266667-4.266667-10.666667 0-14.933333l405.333334-405.333333c2.133333-2.133333 4.266667-2.133333 8.533333-2.133334h270.933333v268.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M704 416c53.333333 0 96-42.666667 96-96s-42.666667-96-96-96-96 42.666667-96 96 42.666667 96 96 96z m0-128c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32-32-14.933333-32-32 14.933333-32 32-32z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconDiscount.defaultProps = {
  size: 18,
};

IconDiscount = React.memo ? React.memo(IconDiscount) : IconDiscount;

export default IconDiscount;
