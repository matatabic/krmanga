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

let IconForward: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M853.333333 757.333333H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666V320c0-6.4 4.266667-10.666667 10.666667-10.666667h599.466666l-83.2 83.2c-12.8 12.8-12.8 34.133333 0 46.933334 6.4 6.4 14.933333 10.666667 23.466667 10.666666s17.066667-4.266667 23.466667-10.666666l145.066666-145.066667c12.8-12.8 12.8-34.133333 0-46.933333l-145.066666-145.066667c-12.8-12.8-34.133333-12.8-46.933334 0-12.8 12.8-12.8 34.133333 0 46.933333l93.866667 93.866667H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666667v426.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c17.066667 0 32-14.933333 32-32s-14.933333-29.866667-32-29.866667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconForward.defaultProps = {
  size: 18,
};

IconForward = React.memo ? React.memo(IconForward) : IconForward;

export default IconForward;
