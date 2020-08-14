/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

console.disableYellowBox = false;

AppRegistry.registerComponent(appName, () => App);
