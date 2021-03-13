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

let IconMianbaoxie: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M239.616 479.914667h751.274667c17.749333 0 32.085333 14.336 32.085333 32.085333s-14.336 32.085333-32.085333 32.085333H239.616c-17.749333 0-32.085333-14.336-32.085333-32.085333 0.341333-17.749333 14.677333-32.085333 32.085333-32.085333z m0 351.573333h751.274667c17.749333 0 32.085333 14.336 32.085333 32.085333s-14.336 32.085333-32.085333 32.085334H239.616c-17.749333 0-32.085333-14.336-32.085333-32.085334 0.341333-17.749333 14.677333-32.085333 32.085333-32.085333z m0-703.488h751.274667c17.749333 0 32.085333 14.336 32.085333 32.085333s-14.336 32.085333-32.085333 32.085334H239.616c-17.749333 0-32.085333-14.336-32.085333-32.085334 0.341333-19.114667 14.677333-32.085333 32.085333-32.085333zM32.085333 479.914667h63.829334c17.749333 0 32.085333 14.336 32.085333 32.085333s-14.336 32.085333-32.085333 32.085333H32.085333c-17.749333 0-32.085333-14.336-32.085333-32.085333s14.336-32.085333 32.085333-32.085333z m0 351.573333h63.829334c17.749333 0 32.085333 14.336 32.085333 32.085333s-14.336 32.085333-32.085333 32.085334H32.085333c-17.749333 0-32.085333-14.336-32.085333-32.085334s14.336-32.085333 32.085333-32.085333z m0-703.488h63.829334c17.749333 0 32.085333 14.336 32.085333 32.085333s-14.336 32.085333-32.085333 32.085334H32.085333c-17.749333 0-32.085333-14.336-32.085333-32.085334 0-19.114667 14.336-32.085333 32.085333-32.085333z m0 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMianbaoxie.defaultProps = {
  size: 18,
};

IconMianbaoxie = React.memo ? React.memo(IconMianbaoxie) : IconMianbaoxie;

export default IconMianbaoxie;
