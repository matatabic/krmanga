import React from 'react';
import {TouchableOpacity,TouchableOpacityProps} from 'react-native';

const Touchable: React.FC<TouchableOpacityProps> = props => (
    <TouchableOpacity activeOpacity={0.8} {...props} />
);

export default Touchable;