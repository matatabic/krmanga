import {DvaLoadingState} from 'dva-loading-ts';
import home from './home';
import categorySetting from './categorySetting';
import brief from "./brief";

const models = [home, categorySetting,brief];

export type RootState = {
  home: typeof home.state;
  categorySetting: typeof categorySetting.state;
  brief:typeof brief.state;
  loading: DvaLoadingState;
} & {
  [key:string]:typeof home.state;
};

export default models;
