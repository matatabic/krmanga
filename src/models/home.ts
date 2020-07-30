import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const CAROUSEL_URL = '/carousel/getCarouselList';

export interface ICarousel {
  id: string;
  image_url: string;
  colors: [string, string];
}

export interface HomeState {
  carousels: ICarousel[];
}

const action = {
  type: 'add',
};

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarousels: Effect;
  };
}

const initealState = {
  carousels: [],
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initealState,
  reducers: {
    setState(state = initealState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCarousels(_, {call, put}) {
      const {data} = yield call(axios.get, CAROUSEL_URL);
      yield put({
        type: 'setState',
        payload: {
          carousels: data.list,
        },
      });
    },
  },
};

export default homeModel;
