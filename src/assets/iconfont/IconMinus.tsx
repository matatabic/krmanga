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

const IconMinus: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M853.333333 544H170.666667c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h682.666666c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMinus.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconMinus) : IconMinus;
