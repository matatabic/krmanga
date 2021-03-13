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

let IconGouyonghu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.971556 1024C229.205333 1024 0 794.766222 0 511.971556 0 229.205333 229.205333 0 511.971556 0 794.766222 0 1024 229.205333 1024 511.971556 1024 794.766222 794.766222 1024 511.971556 1024ZM703.402667 287.971556 422.684444 613.404444 320 511.971556 255.971556 576 422.826667 735.971556 768 352 703.402667 287.971556Z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconGouyonghu.defaultProps = {
  size: 18,
};

IconGouyonghu = React.memo ? React.memo(IconGouyonghu) : IconGouyonghu;

export default IconGouyonghu;
