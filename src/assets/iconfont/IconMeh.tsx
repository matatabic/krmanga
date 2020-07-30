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

const IconMeh: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 949.333333C270.933333 949.333333 74.666667 753.066667 74.666667 512S270.933333 74.666667 512 74.666667 949.333333 270.933333 949.333333 512 753.066667 949.333333 512 949.333333z m0-810.666666C307.2 138.666667 138.666667 307.2 138.666667 512S307.2 885.333333 512 885.333333 885.333333 716.8 885.333333 512 716.8 138.666667 512 138.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M362.666667 512c-23.466667 0-42.666667-19.2-42.666667-42.666667v-64c0-23.466667 19.2-42.666667 42.666667-42.666666s42.666667 19.2 42.666666 42.666666v64c0 23.466667-19.2 42.666667-42.666666 42.666667zM661.333333 512c-23.466667 0-42.666667-19.2-42.666666-42.666667v-64c0-23.466667 19.2-42.666667 42.666666-42.666666s42.666667 19.2 42.666667 42.666666v64c0 23.466667-19.2 42.666667-42.666667 42.666667zM699.733333 714.666667H324.266667c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h373.333333c17.066667 0 32 14.933333 32 32s-12.8 32-29.866667 32z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconMeh.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconMeh) : IconMeh;
