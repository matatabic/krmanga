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

let IconMinusCircle: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 949.333333C270.933333 949.333333 74.666667 753.066667 74.666667 512S270.933333 74.666667 512 74.666667 949.333333 270.933333 949.333333 512 753.066667 949.333333 512 949.333333z m0-810.666666C307.2 138.666667 138.666667 307.2 138.666667 512S307.2 885.333333 512 885.333333 885.333333 716.8 885.333333 512 716.8 138.666667 512 138.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M682.666667 544H341.333333c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h341.333334c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconMinusCircle.defaultProps = {
  size: 18,
};

IconMinusCircle = React.memo ? React.memo(IconMinusCircle) : IconMinusCircle;

export default IconMinusCircle;
