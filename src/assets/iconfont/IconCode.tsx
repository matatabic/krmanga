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

const IconCode: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M322.133333 296.533333c-12.8-12.8-32-12.8-44.8 0l-192 192c-12.8 12.8-12.8 32 0 44.8l192 192c6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466667-8.533334c12.8-12.8 12.8-32 0-44.8L151.466667 512l168.533333-168.533333c12.8-12.8 12.8-34.133333 2.133333-46.933334zM940.8 488.533333l-192-192c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l168.533333 168.533334-168.533333 168.533333c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333l192-192c8.533333-8.533333 8.533333-29.866667-2.133333-42.666667zM622.933333 76.8c-17.066667-4.266667-34.133333 6.4-38.4 23.466667L366.933333 902.4c-4.266667 17.066667 6.4 34.133333 23.466667 38.4 2.133333 0 6.4 2.133333 8.533333 2.133333 14.933333 0 27.733333-8.533333 29.866667-23.466666L644.266667 115.2c4.266667-17.066667-4.266667-34.133333-21.333334-38.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconCode.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconCode) : IconCode;
