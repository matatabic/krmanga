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

const IconImport: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M667.733333 864H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h309.333333V320c0 40.533333 34.133333 74.666667 74.666667 74.666667h160v38.4c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V298.666667c0-8.533333-4.266667-17.066667-8.533334-23.466667l-170.666666-170.666667c-6.4-6.4-14.933333-8.533333-23.466667-8.533333H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h497.066666c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z m46.933334-550.4v17.066667H554.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V160h19.2l151.466667 153.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M853.333333 597.333333H599.466667l51.2-51.2c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-106.666667 106.666667c-12.8 12.8-12.8 32 0 44.8l106.666667 106.666667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8L599.466667 661.333333H853.333333c17.066667 0 32-14.933333 32-32S870.4 597.333333 853.333333 597.333333z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconImport.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconImport) : IconImport;
