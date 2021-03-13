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

let IconGouxuan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M896 0 128 0C57.344 0 0 57.344 0 128l0 768c0 70.656 57.344 128 128 128l768 0c70.656 0 128-57.344 128-128L1024 128C1024 57.344 966.656 0 896 0zM960 896c0 35.392-28.608 64-64 64L128 960c-35.328 0-64-28.608-64-64L64 128c0-35.328 28.672-64 64-64l768 0c35.392 0 64 28.672 64 64L960 896z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M421.568 783.552 149.952 512 240.512 421.44 421.504 602.496 783.552 240.448 874.048 331.008Z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconGouxuan.defaultProps = {
  size: 18,
};

IconGouxuan = React.memo ? React.memo(IconGouxuan) : IconGouxuan;

export default IconGouxuan;
