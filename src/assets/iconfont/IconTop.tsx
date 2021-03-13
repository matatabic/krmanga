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

let IconTop: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M896 96H128c-17.066667 0-32 14.933333-32 32S110.933333 160 128 160h768c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM535.466667 296.533333c-12.8-12.8-32-12.8-44.8 0l-213.333334 213.333334c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0l157.866667-157.866667V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V396.8l157.866667 157.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8l-213.333333-213.333334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconTop.defaultProps = {
  size: 18,
};

IconTop = React.memo ? React.memo(IconTop) : IconTop;

export default IconTop;
