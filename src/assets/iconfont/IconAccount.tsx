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

let IconAccount: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512a238.93333333 238.93333333 0 1 0 0-477.86666667 238.93333333 238.93333333 0 0 0 0 477.86666667z m0-68.26666667a170.66666667 170.66666667 0 1 1 0-341.33333333 170.66666667 170.66666667 0 0 1 0 341.33333333z"
        fill={getIconColor(color, 0, '#2c2c2c')}
      />
      <Path
        d="M443.73333333 307.2h136.53333334a68.26666667 68.26666667 0 1 1-136.53333334 0z"
        fill={getIconColor(color, 1, '#2c2c2c')}
      />
      <Path
        d="M290.13333333 580.26666667h443.73333334c122.53866667 0 221.86666667 91.68213333 221.86666666 204.8s-99.328 204.8-221.86666666 204.8h-443.73333334C167.59466667 989.86666667 68.26666667 898.18453333 68.26666667 785.06666667s99.328-204.8 221.86666666-204.8z m-3.41333333 68.26666666C203.776 648.53333333 136.53333333 709.632 136.53333333 785.06666667s67.24266667 136.53333333 150.18666667 136.53333333h450.56c82.944 0 150.18666667-61.09866667 150.18666667-136.53333333s-67.24266667-136.53333333-150.18666667-136.53333334H286.72z"
        fill={getIconColor(color, 2, '#2c2c2c')}
      />
    </Svg>
  );
};

IconAccount.defaultProps = {
  size: 18,
};

IconAccount = React.memo ? React.memo(IconAccount) : IconAccount;

export default IconAccount;
