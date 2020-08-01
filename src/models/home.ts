import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const CAROUSEL_URL = '/carousel/getCarouselList';
const GUESS_URL = '/book/getGuessList';

export interface ICarousel {
  id: string;
  image: string;
  colors: [string, string];
}

export interface IGuess{
  id:string;
  title:string;
  image:string;
}

export interface HomeState {
  carousels: ICarousel[];
  guess: IGuess[];
}


interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarousels: Effect;
    fetchGuess: Effect;
  };
}

const initealState = {
  carousels: [],
  guess:[],
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
    *fetchGuess(_, {call, put}) {
      const {data} = yield call(axios.get, GUESS_URL);
      yield put({
        type: 'setState',
        payload: {
          guess: data,
        },
      });
    },
  },
};

export default homeModel;
