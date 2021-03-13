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

let IconGou: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1459 1024" width={size} height={size} {...rest}>
      <Path
        d="M1439.080665 18.734797a66.336804 66.336804 0 0 0-93.766391 1.361753l-818.024224 842.341234-413.389174-425.499045a66.336804 66.336804 0 0 0-95.176778 92.404639l460.75871 474.473504a66.336804 66.336804 0 0 0 95.176778 0l865.685564-891.364327a66.28817 66.28817 0 0 0-1.361753-93.766392z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconGou.defaultProps = {
  size: 18,
};

IconGou = React.memo ? React.memo(IconGou) : IconGou;

export default IconGou;
