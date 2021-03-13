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

let IconWeibiaoti: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M614.4 949.527273H130.327273V121.018182h726.109091v584.145454c0 134.981818-109.381818 244.363636-242.036364 244.363637z m-437.527273-46.545455h437.527273c107.054545 0 195.490909-88.436364 195.490909-195.490909V167.563636H176.872727v735.418182z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M646.981818 332.8h-349.090909c-13.963636 0-23.272727-9.309091-23.272727-23.272727s9.309091-23.272727 23.272727-23.272728h349.090909c13.963636 0 23.272727 9.309091 23.272727 23.272728s-9.309091 23.272727-23.272727 23.272727zM635.345455 518.981818H302.545455c-13.963636 0-23.272727-9.309091-23.272728-23.272727s9.309091-23.272727 23.272728-23.272727h332.8c13.963636 0 23.272727 9.309091 23.272727 23.272727s-11.636364 23.272727-23.272727 23.272727zM532.945455 681.890909H302.545455c-13.963636 0-23.272727-9.309091-23.272728-23.272727s9.309091-23.272727 23.272728-23.272727h230.4c13.963636 0 23.272727 9.309091 23.272727 23.272727s-11.636364 23.272727-23.272727 23.272727z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconWeibiaoti.defaultProps = {
  size: 18,
};

IconWeibiaoti = React.memo ? React.memo(IconWeibiaoti) : IconWeibiaoti;

export default IconWeibiaoti;
