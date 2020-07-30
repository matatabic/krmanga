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

const IconSecurity: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M814.933333 179.2L529.066667 78.933333c-10.666667-4.266667-23.466667-4.266667-34.133334 0L209.066667 179.2c-29.866667 10.666667-49.066667 38.4-49.066667 70.4V597.333333c0 194.133333 157.866667 352 352 352S864 791.466667 864 597.333333V249.6c0-32-19.2-61.866667-49.066667-70.4zM800 597.333333c0 157.866667-130.133333 288-288 288S224 755.2 224 597.333333V249.6c0-4.266667 2.133333-8.533333 6.4-10.666667L512 140.8l281.6 98.133333c4.266667 2.133333 6.4 6.4 6.4 10.666667V597.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M659.2 403.2l-192 194.133333-85.333333-68.266666c-12.8-10.666667-34.133333-8.533333-44.8 4.266666-10.666667 12.8-8.533333 34.133333 4.266666 44.8l106.666667 85.333334c6.4 4.266667 12.8 6.4 19.2 6.4 8.533333 0 17.066667-2.133333 23.466667-8.533334l213.333333-213.333333c12.8-12.8 12.8-32 0-44.8-10.666667-10.666667-32-10.666667-44.8 0z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconSecurity.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconSecurity) : IconSecurity;
