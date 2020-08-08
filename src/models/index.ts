import home from './home';
import {DvaLoadingState} from 'dva-loading-ts';
import categorySetting from './categorySetting';

const models = [home, categorySetting];

export type RootState = {
  home: typeof home.state;
  categorySetting: typeof categorySetting.state;
  loading: DvaLoadingState;
};

export default models;
