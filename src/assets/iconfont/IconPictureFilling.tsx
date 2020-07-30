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

const IconPictureFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M853.333333 96c40.533333 0 74.666667 34.133333 74.666667 74.666667v682.666666c0 40.533333-34.133333 74.666667-74.666667 74.666667H170.666667c-40.533333 0-74.666667-34.133333-74.666667-74.666667V170.666667c0-40.533333 34.133333-74.666667 74.666667-74.666667h682.666666zM746.666667 469.333333c-10.666667-12.8-32-14.933333-44.8-2.133333L320 808.533333l-2.133333 2.133334c-19.2 19.2-4.266667 53.333333 23.466666 53.333333h492.8c17.066667-2.133333 29.866667-14.933333 29.866667-32v-196.266667c0-6.4-2.133333-10.666667-6.4-14.933333l-108.8-149.333333-2.133333-2.133334z m-394.666667-202.666666c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPictureFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconPictureFilling) : IconPictureFilling;
