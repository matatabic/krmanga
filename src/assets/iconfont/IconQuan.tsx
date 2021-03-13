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

let IconQuan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M808.96 1024h-156.16c-7.68 0-15.36-2.56-17.92-7.68-5.12-5.12-7.68-12.8-7.68-20.48v-10.24c0-64-51.2-115.2-115.2-115.2s-115.2 51.2-115.2 115.2v10.24c0 7.68-2.56 15.36-7.68 20.48-5.12 5.12-12.8 7.68-17.92 7.68H215.04c-76.8 0-138.24-61.44-138.24-135.68V135.68C76.8 61.44 138.24 0 215.04 0h156.16c15.36 0 25.6 10.24 25.6 25.6 0 64 51.2 115.2 115.2 115.2s115.2-51.2 115.2-115.2c0-15.36 10.24-25.6 25.6-25.6h156.16c76.8 0 138.24 61.44 138.24 135.68v750.08c0 76.8-61.44 138.24-138.24 138.24z m-130.56-51.2h130.56c46.08 0 84.48-38.4 84.48-84.48V135.68C896 89.6 857.6 51.2 808.96 51.2h-133.12C665.6 130.56 593.92 192 512 192S358.4 130.56 348.16 51.2H215.04C166.4 51.2 128 89.6 128 135.68v750.08C128 934.4 166.4 972.8 215.04 972.8h130.56c5.12-87.04 79.36-153.6 166.4-153.6s161.28 66.56 166.4 153.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M343.04 371.2h-128c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6h128c15.36 0 25.6 10.24 25.6 25.6s-10.24 25.6-25.6 25.6zM576 371.2h-128c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6h128c15.36 0 25.6 10.24 25.6 25.6s-12.8 25.6-25.6 25.6zM808.96 371.2h-128c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6h128c15.36 0 25.6 10.24 25.6 25.6s-12.8 25.6-25.6 25.6z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconQuan.defaultProps = {
  size: 18,
};

IconQuan = React.memo ? React.memo(IconQuan) : IconQuan;

export default IconQuan;
