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

const IconNavigation: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M834.133333 213.333333c-6.4-12.8-17.066667-23.466667-29.866666-27.733333-12.8-4.266667-27.733333-4.266667-40.533334 2.133333L106.666667 501.333333c-14.933333 6.4-25.6 21.333333-29.866667 36.266667-6.4 27.733333 12.8 57.6 40.533333 64l249.6 53.333333 53.333334 249.6c4.266667 17.066667 14.933333 29.866667 29.866666 36.266667 6.4 4.266667 14.933333 4.266667 23.466667 4.266667 19.2 0 38.4-10.666667 49.066667-29.866667l313.6-657.066667c6.4-12.8 6.4-29.866667-2.133334-44.8zM477.866667 861.866667L426.666667 622.933333c-2.133333-12.8-12.8-21.333333-23.466667-23.466666L162.133333 546.133333l601.6-288-285.866666 603.733334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconNavigation.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconNavigation) : IconNavigation;
