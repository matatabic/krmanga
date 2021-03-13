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

let IconMima: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M230 331v-28.5C230 146.48 356.48 20 512.5 20 668.52 20 795 146.48 795 302.5V331h33c72.902 0 132 59.098 132 132v423c0 72.902-59.098 132-132 132H197c-72.902 0-132-59.098-132-132V463c0-72.902 59.098-132 132-132h33z m88 0h389v-28.5C707 195.08 619.92 108 512.5 108S318 195.08 318 302.5V331z m-121 88c-24.3 0-44 19.7-44 44v423c0 24.3 19.7 44 44 44h631c24.3 0 44-19.7 44-44V463c0-24.3-19.7-44-44-44H197z m315 404c-83.947 0-152-68.053-152-152s68.053-152 152-152 152 68.053 152 152-68.053 152-152 152z m0-88c35.346 0 64-28.654 64-64 0-35.346-28.654-64-64-64-35.346 0-64 28.654-64 64 0 35.346 28.654 64 64 64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMima.defaultProps = {
  size: 18,
};

IconMima = React.memo ? React.memo(IconMima) : IconMima;

export default IconMima;
