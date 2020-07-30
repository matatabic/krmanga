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

const IconMap: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 74.666667C317.866667 74.666667 160 234.666667 160 428.8c0 264.533333 320 484.266667 334.933333 492.8 6.4 4.266667 10.666667 6.4 17.066667 6.4s12.8-2.133333 17.066667-6.4c12.8-8.533333 334.933333-228.266667 334.933333-492.8C864 234.666667 706.133333 74.666667 512 74.666667z m0 782.933333c-66.133333-49.066667-288-228.266667-288-426.666667 0-160 130.133333-290.133333 288-290.133333s288 130.133333 288 290.133333c0 196.266667-221.866667 377.6-288 426.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512 309.333333c-76.8 0-138.666667 61.866667-138.666667 138.666667s61.866667 138.666667 138.666667 138.666667 138.666667-61.866667 138.666667-138.666667-61.866667-138.666667-138.666667-138.666667z m0 213.333334c-40.533333 0-74.666667-34.133333-74.666667-74.666667s34.133333-74.666667 74.666667-74.666667 74.666667 34.133333 74.666667 74.666667-34.133333 74.666667-74.666667 74.666667z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconMap.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconMap) : IconMap;
