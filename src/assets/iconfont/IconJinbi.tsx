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

let IconJinbi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 960C265.6 960 64 758.4 64 512S265.6 64 512 64s448 201.6 448 448-201.6 448-448 448z m0-832c-211.2 0-384 172.8-384 384s172.8 384 384 384 384-172.8 384-384-172.8-384-384-384z m0 672c-17.6 0-32-14.4-32-32V480c0-17.6 14.4-32 32-32s32 14.4 32 32v288c0 17.6-14.4 32-32 32z m160-128H352c-17.6 0-32-14.4-32-32s14.4-32 32-32h320c17.6 0 32 14.4 32 32s-14.4 32-32 32z m0-160H352c-17.6 0-32-14.4-32-32s14.4-32 32-32h320c17.6 0 32 14.4 32 32s-14.4 32-32 32z m-160 0c-8 0-16-3.2-22.4-9.6L331.2 344c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l158.4 158.4c12.8 12.8 12.8 32 0 44.8-6.4 6.4-14.4 9.6-22.4 9.6z m0 0c-8 0-16-3.2-22.4-9.6-12.8-12.8-12.8-32 0-44.8L648 299.2c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L534.4 502.4C528 508.8 520 512 512 512z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconJinbi.defaultProps = {
  size: 18,
};

IconJinbi = React.memo ? React.memo(IconJinbi) : IconJinbi;

export default IconJinbi;
