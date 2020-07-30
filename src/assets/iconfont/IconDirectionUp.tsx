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

const IconDirectionUp: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M896 467.2l-362.666667-341.333333c-2.133333-2.133333-6.4-4.266667-8.533333-6.4-4.266667-2.133333-6.4-2.133333-10.666667-2.133334s-8.533333 0-10.666666 2.133334c-4.266667 2.133333-6.4 4.266667-8.533334 6.4l-362.666666 341.333333c-12.8 12.8-12.8 32-2.133334 44.8 12.8 12.8 32 12.8 44.8 2.133333l309.333334-290.133333V874.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V224L853.333333 514.133333c6.4 6.4 14.933333 8.533333 21.333334 8.533334 8.533333 0 17.066667-4.266667 23.466666-10.666667 12.8-12.8 10.666667-32-2.133333-44.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconDirectionUp.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconDirectionUp) : IconDirectionUp;
