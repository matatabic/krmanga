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

let IconDingdan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M759.783298 119.019145h-109.738493v-8.003259A111.146232 111.146232 0 0 0 539.028919 0h-54.067617a111.146232 111.146232 0 0 0-111.015886 111.015886v8.003259H264.206923A136.48554 136.48554 0 0 0 127.864764 255.361303V887.657841a136.48554 136.48554 0 0 0 136.342159 136.342159h495.576375A136.48554 136.48554 0 0 0 896.125457 887.657841V255.361303a136.48554 136.48554 0 0 0-136.342159-136.342158z m-328.472505-8.003259A53.728717 53.728717 0 0 1 484.961302 57.352342h54.054582a53.728717 53.728717 0 0 1 53.663544 53.663544v8.003259H431.297758zM838.773114 887.657841a79.068024 79.068024 0 0 1-78.989816 78.989817H264.206923A79.068024 79.068024 0 0 1 185.217106 887.657841V255.361303a79.068024 79.068024 0 0 1 78.989817-78.989816h495.576375a79.068024 79.068024 0 0 1 78.989816 78.989816z"
        fill={getIconColor(color, 0, '#474747')}
      />
      <Path
        d="M730.729123 365.099796H293.274133a28.676171 28.676171 0 0 0 0 57.352342h437.45499a28.676171 28.676171 0 0 0 0-57.352342zM648.702239 583.833809H375.287982a28.676171 28.676171 0 0 0 0 57.352342h273.414257a28.676171 28.676171 0 0 0 0-57.352342z"
        fill={getIconColor(color, 1, '#474747')}
      />
    </Svg>
  );
};

IconDingdan.defaultProps = {
  size: 18,
};

IconDingdan = React.memo ? React.memo(IconDingdan) : IconDingdan;

export default IconDingdan;
