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

const IconSkip: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M921.6 356.266667c-14.933333-8.533333-34.133333-4.266667-42.666667 12.8L829.866667 448c-51.2-157.866667-200.533333-266.666667-369.066667-266.666667-172.8 0-324.266667 115.2-373.333333 277.333334-4.266667 17.066667 4.266667 34.133333 21.333333 40.533333 17.066667 4.266667 34.133333-4.266667 40.533333-21.333333 40.533333-136.533333 166.4-232.533333 311.466667-232.533334 140.8 0 264.533333 89.6 307.2 219.733334l-81.066667-46.933334c-14.933333-8.533333-34.133333-4.266667-42.666666 10.666667-8.533333 14.933333-4.266667 34.133333 10.666666 42.666667l147.2 85.333333c4.266667 2.133333 10.666667 4.266667 17.066667 4.266667 2.133333 0 6.4 0 8.533333-2.133334 8.533333-2.133333 14.933333-8.533333 19.2-14.933333l85.333334-147.2c8.533333-12.8 4.266667-32-10.666667-40.533333zM896 757.333333H128c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h768c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconSkip.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconSkip) : IconSkip;
