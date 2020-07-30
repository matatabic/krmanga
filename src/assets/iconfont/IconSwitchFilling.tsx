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

const IconSwitchFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M934.4 659.2l-174.933333-224c-4.266667-4.266667-10.666667-8.533333-17.066667-8.533333-2.133333 0-4.266667 0-6.4 2.133333-8.533333 2.133333-14.933333 10.666667-14.933333 19.2v110.933333H405.333333c-12.8 0-21.333333 8.533333-21.333333 21.333334v179.2c0 14.933333 8.533333 25.6 21.333333 25.6h313.6V896c0 8.533333 6.4 17.066667 14.933334 19.2 8.533333 2.133333 17.066667 0 23.466666-6.4l174.933334-221.866667c8.533333-8.533333 8.533333-19.2 2.133333-27.733333zM640 441.6v-179.2c0-14.933333-8.533333-25.6-21.333333-25.6H305.066667V128c0-8.533333-6.4-17.066667-14.933334-19.2s-17.066667 0-23.466666 6.4L89.6 334.933333c-6.4 8.533333-6.4 19.2 0 29.866667l174.933333 224c4.266667 4.266667 10.666667 8.533333 17.066667 8.533333 2.133333 0 4.266667 0 6.4-2.133333 8.533333-2.133333 14.933333-10.666667 14.933333-19.2v-110.933333H618.666667c12.8-2.133333 21.333333-10.666667 21.333333-23.466667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconSwitchFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconSwitchFilling) : IconSwitchFilling;
