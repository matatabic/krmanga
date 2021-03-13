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

let IconLajitong: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M800 384C782.08 384 768 398.08 768 416L768 832c0 35.2-28.8 64-64 64l-64 0L640 416C640 398.08 625.92 384 608 384 590.08 384 576 398.08 576 416L576 896 448 896 448 416C448 398.08 433.92 384 416 384 398.08 384 384 398.08 384 416L384 896 320 896c-35.2 0-64-28.8-64-64L256 416C256 398.08 241.92 384 224 384 206.08 384 192 398.08 192 416L192 832c0 70.4 57.6 128 128 128l384 0c70.4 0 128-57.6 128-128L832 416C832 398.08 817.92 384 800 384zM864 256l-704 0C142.08 256 128 270.08 128 288 128 305.92 142.08 320 160 320l704 0C881.92 320 896 305.92 896 288 896 270.08 881.92 256 864 256zM352 192l320 0C689.92 192 704 177.92 704 160 704 142.08 689.92 128 672 128l-320 0C334.08 128 320 142.08 320 160 320 177.92 334.08 192 352 192z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconLajitong.defaultProps = {
  size: 18,
};

IconLajitong = React.memo ? React.memo(IconLajitong) : IconLajitong;

export default IconLajitong;
