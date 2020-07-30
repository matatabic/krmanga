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

const IconFolderClose: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M853.333333 266.666667H514.133333c-4.266667 0-6.4-2.133333-8.533333-4.266667l-38.4-66.133333c-12.8-21.333333-38.4-36.266667-64-36.266667H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666667v554.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V341.333333c0-40.533333-34.133333-74.666667-74.666667-74.666666z m-682.666666-42.666667h232.533333c4.266667 0 6.4 2.133333 8.533333 4.266667l38.4 66.133333c12.8 21.333333 38.4 36.266667 64 36.266667H853.333333c6.4 0 10.666667 4.266667 10.666667 10.666666v74.666667h-704V234.666667c0-6.4 4.266667-10.666667 10.666667-10.666667z m682.666666 576H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V480h704V789.333333c0 6.4-4.266667 10.666667-10.666667 10.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFolderClose.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconFolderClose) : IconFolderClose;
