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

const IconCut: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M917.333333 202.666667h-96V106.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v96H277.333333c-40.533333 0-74.666667 34.133333-74.666666 74.666666v480H106.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h96V917.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-96H746.666667c40.533333 0 74.666667-34.133333 74.666666-74.666666V266.666667H917.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM757.333333 746.666667c0 6.4-4.266667 10.666667-10.666666 10.666666H266.666667V277.333333c0-6.4 4.266667-10.666667 10.666666-10.666666h480V746.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconCut.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconCut) : IconCut;
