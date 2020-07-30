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

const IconFolderFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M403.2 160c25.6 0 51.2 12.8 64 36.266667l38.4 66.133333c2.133333 4.266667 6.4 4.266667 8.533333 4.266667H853.333333c40.533333 0 74.666667 34.133333 74.666667 74.666666v448c0 40.533333-34.133333 74.666667-74.666667 74.666667H170.666667c-40.533333 0-74.666667-34.133333-74.666667-74.666667V234.666667c0-40.533333 34.133333-74.666667 74.666667-74.666667h232.533333z m87.466667 256H253.866667c-17.066667 2.133333-29.866667 14.933333-29.866667 32s14.933333 32 32 32h236.8c17.066667-2.133333 29.866667-14.933333 29.866667-32s-14.933333-32-32-32z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFolderFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconFolderFilling) : IconFolderFilling;
