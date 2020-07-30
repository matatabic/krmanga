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

const IconSelect: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M409.6 757.333333c-8.533333 0-17.066667-2.133333-23.466667-8.533333l-238.933333-234.666667c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l215.466667 213.333334 422.4-428.8c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L430.933333 746.666667c-4.266667 8.533333-12.8 10.666667-21.333333 10.666666z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconSelect.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconSelect) : IconSelect;
