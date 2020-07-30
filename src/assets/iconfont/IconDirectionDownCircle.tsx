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

const IconDirectionDownCircle: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M672 499.2l-128 119.466667V341.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v277.333334l-128-119.466667c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l181.333334 170.666667c6.4 6.4 14.933333 8.533333 21.333333 8.533333s14.933333-2.133333 21.333333-8.533333l181.333334-170.666667c12.8-12.8 12.8-32 2.133333-44.8-12.8-12.8-32-14.933333-44.8-2.133333z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconDirectionDownCircle.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconDirectionDownCircle) : IconDirectionDownCircle;
