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

let IconGengxin1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M599.6 529.9l-77.8-77.8c-5.9-5.9-15.4-5.9-21.2 0l-77.8 77.8c-5.9 5.9-5.9 15.4 0 21.2 5.9 5.9 15.4 5.9 21.2 0l51.7-51.7V635c0 8.3 6.7 15 15 15s15-6.7 15-15V498.4l52.7 52.7c5.9 5.9 15.4 5.9 21.2 0 5.9-5.9 5.9-15.4 0-21.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M514.1 283.8c45.5 0 91.3 18.3 125.8 50.2 17 15.7 30.4 33.9 39.7 53.8 9.7 20.6 14.6 42.4 14.6 64.6 0 2.2-0.1 4.6-0.2 7.2l-1.2 27.9 27.7 3.2c30.2 3.5 58 17.9 78.4 40.6 20.5 22.9 31.8 52.4 31.8 83.2 0 33.3-13 64.6-36.5 88.2-23.5 23.5-54.7 36.5-88 36.5H300l-4.2-0.3c-28.1-2-54.2-14.5-73.5-35.2-19.4-20.8-30.1-47.9-30.1-76.3 0-29.9 11.6-57.9 32.7-79s49.2-32.7 79-32.7H306.2l36.2 0.7-6-35.7c-1.6-9.3-2.4-18.9-2.4-28.3 0-22.2 4.9-43.9 14.6-64.6 9.4-20 22.7-38.1 39.7-53.8 34.4-31.9 80.3-50.2 125.8-50.2m0-30c-109.7 0-210.1 88.9-210.1 198.6 0 11.4 1 22.5 2.8 33.3H304c-78.3 0-141.8 63.5-141.8 141.8 0 74.8 58 136.1 131.4 141.4v0.4H706c85.4 0 154.7-69.3 154.7-154.7 0-79.4-59.8-144.8-136.8-153.6 0.1-2.8 0.2-5.6 0.2-8.5 0-109.8-100.3-198.7-210-198.7z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconGengxin1.defaultProps = {
  size: 18,
};

IconGengxin1 = React.memo ? React.memo(IconGengxin1) : IconGengxin1;

export default IconGengxin1;
