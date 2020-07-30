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

const IconFabulous: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M859.733333 253.866667c-44.8-44.8-102.4-70.4-166.4-70.4-61.866667 0-121.6 25.6-166.4 70.4l-14.933333 17.066666-17.066667-17.066666c-44.8-44.8-102.4-70.4-166.4-70.4-61.866667 0-121.6 25.6-166.4 70.4-91.733333 91.733333-91.733333 243.2 0 337.066666l324.266667 330.666667c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-4.266667 23.466666-8.533333l324.266667-330.666667c44.8-44.8 68.266667-104.533333 68.266667-168.533333s-21.333333-123.733333-66.133334-168.533333z m-44.8 290.133333L512 853.333333 209.066667 544c-66.133333-68.266667-66.133333-179.2 0-247.466667 32-32 74.666667-51.2 119.466666-51.2 44.8 0 87.466667 17.066667 119.466667 51.2l38.4 40.533334c12.8 12.8 34.133333 12.8 44.8 0l38.4-40.533334c32-32 74.666667-51.2 119.466667-51.2 44.8 0 87.466667 17.066667 119.466666 51.2 32 32 49.066667 76.8 49.066667 123.733334s-12.8 91.733333-42.666667 123.733333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFabulous.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconFabulous) : IconFabulous;
