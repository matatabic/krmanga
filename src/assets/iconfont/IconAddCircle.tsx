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

const IconAddCircle: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M682.666667 480h-138.666667V341.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v138.666667H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h138.666667V682.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-138.666667H682.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconAddCircle.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconAddCircle) : IconAddCircle;
