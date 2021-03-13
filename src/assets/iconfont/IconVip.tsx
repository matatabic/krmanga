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

let IconVip: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M747.2 896H276.8c-46.4 0-84.8-32-94.4-76.8L64 230.4c-3.2-12.8 3.2-27.2 16-33.6 11.2-6.4 27.2-4.8 36.8 3.2l198.4 169.6 171.2-228.8c12.8-16 38.4-16 51.2 0l171.2 228.8L907.2 200c9.6-9.6 25.6-9.6 36.8-3.2 11.2 6.4 17.6 20.8 16 33.6L841.6 819.2c-9.6 44.8-48 76.8-94.4 76.8zM145.6 308.8l99.2 497.6c3.2 14.4 16 25.6 32 25.6h470.4c16 0 28.8-11.2 32-25.6l99.2-497.6L724.8 440c-6.4 6.4-16 8-24 8-8-1.6-17.6-4.8-22.4-12.8L512 212.8 345.6 435.2c-4.8 6.4-12.8 11.2-22.4 12.8-8 1.6-17.6-1.6-24-8L145.6 308.8zM512 736c-11.2 0-22.4-6.4-27.2-16l-96-160c-9.6-14.4-4.8-35.2 11.2-43.2 14.4-9.6 35.2-4.8 43.2 11.2L512 641.6 580.8 528c9.6-14.4 28.8-20.8 43.2-11.2 14.4 9.6 20.8 28.8 11.2 43.2l-96 160c-4.8 9.6-16 16-27.2 16z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconVip.defaultProps = {
  size: 18,
};

IconVip = React.memo ? React.memo(IconVip) : IconVip;

export default IconVip;
