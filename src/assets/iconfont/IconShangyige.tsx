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

let IconShangyige: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M64 0h64v960H64V0z m283.52 480.064L790.4 45.632 745.536 0 256 480.192 747.584 960l44.736-45.696-444.8-434.24z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconShangyige.defaultProps = {
  size: 18,
};

IconShangyige = React.memo ? React.memo(IconShangyige) : IconShangyige;

export default IconShangyige;
