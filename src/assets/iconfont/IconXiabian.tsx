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

let IconXiabian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M517.500115 1024a100 100 0 0 1-77-37h-1L109.500115 546a40 40 0 0 1 32-64h180V100A100 100 0 0 1 421.500115 0h180a100 100 0 0 1 100 100v382h181a40 40 0 0 1 32 63L596.500115 985h-1a100 100 0 0 1-78 38z m47-63z m-62-24a20 20 0 0 0 30 0l271-375H661.500115a40 40 0 0 1-40-40V100a20 20 0 0 0-20-20H421.500115a20 20 0 0 0-20 20v422a40 40 0 0 1-40 40H221.500115z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXiabian.defaultProps = {
  size: 18,
};

IconXiabian = React.memo ? React.memo(IconXiabian) : IconXiabian;

export default IconXiabian;
