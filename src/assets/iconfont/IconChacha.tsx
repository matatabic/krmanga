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

let IconChacha: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 32C251.4285715625 32 32 251.4285715625 32 512s219.4285715625 480 480 480 480-219.4285715625 480-480-219.4285715625-480-480-480z m205.7142853125 617.142856875c20.5714284375 20.5714284375 20.5714284375 48 0 61.714286249999994-20.5714284375 20.5714284375-48 20.5714284375-61.714285312499996 0l-137.142856875-137.1428578125L374.857143125 717.7142853125c-20.5714284375 20.5714284375-48 20.5714284375-68.5714284375 0s-20.5714284375-54.857143125 0-68.5714284375l144-144-137.1428578125-137.142856875c-20.5714284375-13.714285312500001-20.5714284375-41.142856875 0-61.714285312499996 20.5714284375-20.5714284375 48-20.5714284375 61.714286249999994 0l137.142856875 137.142856875 144-144c20.5714284375-20.5714284375 48-20.5714284375 68.5714284375 0 20.5714284375 20.5714284375 20.5714284375 48 0 68.5714284375L580.5714284375 512l137.142856875 137.142856875z"
        fill={getIconColor(color, 0, '#999999')}
      />
    </Svg>
  );
};

IconChacha.defaultProps = {
  size: 18,
};

IconChacha = React.memo ? React.memo(IconChacha) : IconChacha;

export default IconChacha;
