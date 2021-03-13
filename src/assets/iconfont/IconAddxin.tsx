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

let IconAddxin: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M790.3 437.1c-93.6 0-169.6 75.9-169.6 169.6s75.9 169.7 169.6 169.7S960 700.3 960 606.6c0-93.6-76-169.5-169.7-169.5z m84.5 193.3H814v60.7c0 13.2-10.6 23.8-23.8 23.8-13.1 0-23.6-10.6-23.6-23.8v-60.7h-60.7c-13.1 0-23.8-10.6-23.8-23.8 0-13.1 10.7-23.8 23.6-23.8h60.7v-60.7c0-13.2 10.7-23.8 23.6-23.8 13.2 0 23.8 10.7 23.8 23.8v60.7h60.7c13.1 0 23.8 10.7 23.8 23.8 0.3 13.2-10.4 23.8-23.5 23.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M790.3 401c51.6 0 98.5 19.2 134.7 50.6 8-25.3 13-53.5 13-85.7C938 217.2 813.4 129 711.8 129s-168.7 58.8-210.9 131.3C458.8 187.7 391.7 129 290.2 129 188.6 129 64 217.2 64 366c0 150.8 133.1 229.1 183.8 273 1 0.8 198.9 153.4 253.1 255.9 24.5-46.2 81.6-102.4 137.4-150.5-33.1-36.5-53.6-84.7-53.6-137.8C584.7 493.2 677 401 790.3 401zM351.2 202.4c-2.3 8.4-11 13.4-19.5 11.2-13-3.6-26.7-5.3-41.5-5.3-58.6 0-143.5 52-146.7 150.8-0.4 8.6-7.4 15.2-15.9 15.2h-0.6c-8.8-0.4-15.6-7.7-15.2-16.5 5-118 103.7-181.1 178.5-181.2 17.3 0 34 2.1 49.8 6.4 8.3 2.2 13.3 11 11.1 19.4z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconAddxin.defaultProps = {
  size: 18,
};

IconAddxin = React.memo ? React.memo(IconAddxin) : IconAddxin;

export default IconAddxin;
