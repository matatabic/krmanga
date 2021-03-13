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

let IconTianxie: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M64 423.328l64-1e-8L128 800a96 96 0 0 0 90.368 95.84L224 896l576 0a96 96 0 0 0 95.84-90.368L896 800l0-576a96 96 0 0 0-90.368-95.84L800 128 425.6 128l0-64L800 64a160 160 0 0 1 159.84 153.056L960 224 960 800a160 160 0 0 1-153.056 159.84L800 960 224 960a160 160 0 0 1-159.84-153.056L64 800l0-376.672z m9.37599999-336.704l45.248-45.248 544.00000001 544.00000001-45.248 45.24799999-544.00000001-544z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconTianxie.defaultProps = {
  size: 18,
};

IconTianxie = React.memo ? React.memo(IconTianxie) : IconTianxie;

export default IconTianxie;
