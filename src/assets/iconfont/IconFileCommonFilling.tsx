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

const IconFileCommonFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M832 85.333333c17.066667 0 32 14.933333 32 32v768c0 29.866667-23.466667 53.333333-53.333333 53.333334-12.8 0-23.466667-4.266667-34.133334-12.8L512 712.533333l-264.533333 213.333334c-21.333333 17.066667-53.333333 14.933333-72.533334-4.266667l-2.133333-2.133333c-8.533333-8.533333-12.8-21.333333-12.8-34.133334v-768C160 100.266667 174.933333 85.333333 192 85.333333h640zM554.666667 448H339.2c-17.066667 2.133333-29.866667 14.933333-29.866667 32S324.266667 512 341.333333 512h215.466667c17.066667-2.133333 29.866667-14.933333 29.866667-32S571.733333 448 554.666667 448z m106.666666-170.666667H339.2c-17.066667 2.133333-29.866667 14.933333-29.866667 32S324.266667 341.333333 341.333333 341.333333h322.133334c17.066667-2.133333 29.866667-14.933333 29.866666-32S678.4 277.333333 661.333333 277.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFileCommonFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconFileCommonFilling) : IconFileCommonFilling;
