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

const IconRunIn: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M612.352 765.952l-69.632 69.632V716.8c0-16.384-14.336-30.72-30.72-30.72s-30.72 14.336-30.72 30.72v120.832l-69.632-69.632c-12.288-12.288-30.72-12.288-43.008 0s-12.288 30.72 0 43.008l122.88 122.88c6.144 6.144 14.336 8.192 22.528 8.192s16.384-2.048 22.528-8.192l122.88-122.88c12.288-12.288 12.288-30.72 0-43.008s-34.816-12.288-47.104-2.048zM927.744 421.888l-237.568-79.872c-16.384-6.144-32.768 4.096-38.912 18.432-6.144 16.384 4.096 32.768 18.432 38.912l153.6 51.2L512 561.152 200.704 450.56l153.6-51.2c16.384-6.144 24.576-22.528 18.432-38.912-6.144-16.384-22.528-24.576-38.912-18.432L96.256 421.888c-12.288 4.096-20.48 16.384-20.48 28.672 0 12.288 8.192 24.576 20.48 28.672l405.504 143.36c4.096 2.048 6.144 2.048 10.24 2.048s6.144 0 10.24-2.048l405.504-143.36c12.288-4.096 20.48-16.384 20.48-28.672 0-14.336-8.192-24.576-20.48-28.672z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512 501.76c16.384 0 30.72-14.336 30.72-30.72V153.6c0-16.384-14.336-30.72-30.72-30.72s-30.72 14.336-30.72 30.72V471.04c0 16.384 14.336 30.72 30.72 30.72z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconRunIn.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconRunIn) : IconRunIn;
