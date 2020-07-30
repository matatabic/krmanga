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

const IconFileCommon: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M832 74.666667H192c-17.066667 0-32 14.933333-32 32v765.866666c0 12.8 4.266667 23.466667 12.8 34.133334 8.533333 10.666667 21.333333 17.066667 36.266667 19.2h6.4c12.8 0 23.466667-4.266667 34.133333-12.8l264.533333-213.333334 264.533334 213.333334c8.533333 8.533333 21.333333 12.8 34.133333 12.8 29.866667 0 53.333333-23.466667 53.333333-53.333334V106.666667c-2.133333-17.066667-17.066667-32-34.133333-32z m-32 776.533333L531.2 633.6c-10.666667-8.533333-27.733333-8.533333-40.533333 0L224 851.2V138.666667h576v712.533333z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M341.333333 341.333333h320c17.066667 0 32-14.933333 32-32S678.4 277.333333 661.333333 277.333333H341.333333c-17.066667 0-32 14.933333-32 32S324.266667 341.333333 341.333333 341.333333zM341.333333 512h213.333334c17.066667 0 32-14.933333 32-32S571.733333 448 554.666667 448H341.333333c-17.066667 0-32 14.933333-32 32S324.266667 512 341.333333 512z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconFileCommon.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconFileCommon) : IconFileCommon;
