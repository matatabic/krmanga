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

const IconShujiashugui: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M894.2 960.2h-767c-17.6 0-32-14.4-32-32v-834c0-17.6 14.4-32 32-32h767c17.6 0 32 14.4 32 32v834c0 17.7-14.4 32-32 32z m-759-40h751v-818h-751v818z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M130.7 331.7h760v40h-760zM130.7 650.7h760v40h-760z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M510.7 944c-11 0-20-9-20-20V86c0-11 9-20 20-20s20 9 20 20v838c0 11-9 20-20 20zM265.4 659.8c-9 0-17.1-6.1-19.4-15.2L218.6 535c-2.7-10.7 3.8-21.6 14.6-24.3 10.7-2.7 21.6 3.8 24.3 14.6l27.4 109.6c2.7 10.7-3.8 21.6-14.6 24.3-1.7 0.4-3.3 0.6-4.9 0.6zM195.4 660.8c-9 0-17.1-6.1-19.4-15.2L148.6 536c-2.7-10.7 3.8-21.6 14.6-24.3 10.7-2.7 21.6 3.8 24.3 14.6l27.4 109.6c2.7 10.7-3.8 21.6-14.6 24.3-1.7 0.4-3.3 0.6-4.9 0.6zM665.4 364.8c-9 0-17.1-6.1-19.4-15.2L618.6 240c-2.7-10.7 3.8-21.6 14.6-24.3 10.7-2.7 21.6 3.8 24.3 14.6l27.4 109.6c2.7 10.7-3.8 21.6-14.6 24.3-1.7 0.4-3.3 0.6-4.9 0.6zM595.4 365.8c-9 0-17.1-6.1-19.4-15.2L548.6 241c-2.7-10.7 3.8-21.6 14.6-24.3 10.7-2.7 21.6 3.8 24.3 14.6l27.4 109.6c2.7 10.7-3.8 21.6-14.6 24.3-1.7 0.4-3.3 0.6-4.9 0.6z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M676.4 942.8c-9 0-17.1-6.1-19.4-15.2L629.6 818c-2.7-10.7 3.8-21.6 14.6-24.3 10.7-2.7 21.6 3.8 24.3 14.6l27.4 109.6c2.7 10.7-3.8 21.6-14.6 24.3-1.7 0.4-3.3 0.6-4.9 0.6zM606.4 943.8c-9 0-17.1-6.1-19.4-15.2L559.6 819c-2.7-10.7 3.8-21.6 14.6-24.3 10.7-2.7 21.6 3.8 24.3 14.6l27.4 109.6c2.7 10.7-3.8 21.6-14.6 24.3-1.7 0.4-3.3 0.6-4.9 0.6z"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

IconShujiashugui.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconShujiashugui) : IconShujiashugui;
