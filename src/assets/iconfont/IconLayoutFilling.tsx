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

const IconLayoutFilling: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M928 853.333333c0 40.533333-34.133333 74.666667-74.666667 74.666667H405.333333v-490.666667h522.666667V853.333333zM341.333333 437.333333v490.666667H170.666667c-40.533333 0-74.666667-34.133333-74.666667-74.666667V437.333333H341.333333zM96 170.666667c0-40.533333 34.133333-74.666667 74.666667-74.666667h682.666666c40.533333 0 74.666667 34.133333 74.666667 74.666667v202.666666h-832V170.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconLayoutFilling.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconLayoutFilling) : IconLayoutFilling;
