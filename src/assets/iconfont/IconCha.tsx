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

let IconCha: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M240.896 240.896a21.333333 21.333333 0 0 1 27.221333-2.432l2.986667 2.432 512 512a21.333333 21.333333 0 0 1-27.221333 32.64l-2.986667-2.432-512-512a21.333333 21.333333 0 0 1 0-30.208z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M752.896 240.896a21.333333 21.333333 0 0 1 32.64 27.221333l-2.432 2.986667-512 512a21.333333 21.333333 0 0 1-32.64-27.221333l2.432-2.986667 512-512z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconCha.defaultProps = {
  size: 18,
};

IconCha = React.memo ? React.memo(IconCha) : IconCha;

export default IconCha;
