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

const IconMehFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 74.666667c241.066667 0 437.333333 196.266667 437.333333 437.333333S753.066667 949.333333 512 949.333333 74.666667 753.066667 74.666667 512 270.933333 74.666667 512 74.666667z m-187.733333 576h-2.133334c-17.066667 2.133333-29.866667 14.933333-29.866666 32s14.933333 32 32 32h375.466666c17.066667-2.133333 29.866667-14.933333 29.866667-32s-14.933333-32-32-32H324.266667zM362.666667 362.666667c-23.466667 0-42.666667 19.2-42.666667 42.666666v66.133334c2.133333 21.333333 19.2 40.533333 42.666667 40.533333s42.666667-19.2 42.666666-42.666667v-66.133333c-2.133333-23.466667-19.2-40.533333-42.666666-40.533333z m298.666666 0c-23.466667 0-42.666667 19.2-42.666666 42.666666v66.133334c2.133333 21.333333 19.2 40.533333 42.666666 40.533333s42.666667-19.2 42.666667-42.666667v-66.133333c-2.133333-23.466667-19.2-40.533333-42.666667-40.533333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMehFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconMehFilling) : IconMehFilling;
