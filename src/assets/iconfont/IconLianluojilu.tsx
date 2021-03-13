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

let IconLianluojilu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M756.8 463.3c-11.1 0.3-19.8 9.5-19.5 20.6v364.7c0 39.9-32.4 72.3-72.3 72.3H175.4c-40 0-72.5-32.3-72.8-72.3V232.5c0-40.2 32.6-72.8 72.8-72.8h333.5c10.4 0 18.9-8.5 18.9-18.9s-8.5-18.9-18.9-18.9H175.4C114 122 64.2 171.7 64.2 233.1v614.8c0 61.4 49.8 111.2 111.2 111.2h489.7c61-0.3 110.3-49.7 110.6-110.6V482.7c0-10.5-8.3-19.1-18.9-19.4zM281 752.9h308c10.4 0 18.9-8.5 18.9-18.9s-8.5-18.9-18.9-18.9H281c-10.4 0-18.9 8.5-18.9 18.9s8.5 18.9 18.9 18.9z m0-206.3h129c10.4 0 18.9-8.5 18.9-18.9-1.1-9.6-9.3-16.7-18.9-16.7H281c-9.6-0.1-17.8 7.1-18.9 16.7 0 10.5 8.5 18.9 18.9 18.9z m0-193.4h129c10.4 0 18.9-8.5 18.9-18.9 0-10.4-8.5-18.9-18.9-18.9H281c-10.4 0-18.9 8.5-18.9 18.9 0 10.4 8.5 18.9 18.9 18.9zM898.2 69.5c-8.6-8.6-22.6-8.5-31.2 0.2L532.8 403.8c-8.7 8.7-8.8 22.7-0.2 31.2 8.6 8.6 22.6 8.5 31.2-0.2L898 100.7c8.7-8.7 8.8-22.6 0.2-31.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconLianluojilu.defaultProps = {
  size: 18,
};

IconLianluojilu = React.memo ? React.memo(IconLianluojilu) : IconLianluojilu;

export default IconLianluojilu;
