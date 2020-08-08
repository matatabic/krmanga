import { Effect, Model, SubscriptionsMapObject } from 'dva-core-ts';
import { Reducer } from 'redux';
import storage, { load } from '@/config/storage';
import axios from 'axios';
import { RootState } from '@/models/index';

const CATEGORY_URl = '/category/getCategoryList';

export interface ICategory {
  id: string;
  name: string;
  classify?: string;
}

export interface ICategories {
  [key: string]: ICategory[];
}

interface CategorySettingModelState {
  isEdit: boolean;
  myCategories: ICategory[];
  categories: ICategories[];
}

interface CategorySettingModel extends Model {
  namespace: 'categorySetting';
  state: CategorySettingModelState;
  reducers: {
    setState: Reducer<CategorySettingModelState>;
  };
  effects: {
    loadData: Effect;
    toggle: Effect;
  };
  subscriptions: SubscriptionsMapObject;
}

const initialState = {
  isEdit: false,
  myCategories: [
    { id: 'home', name: '推荐' },
    { id: 'vip', name: 'Vip' },
  ],
  categories: [],
};

const categorySettingModel: CategorySettingModel = {
  namespace: 'categorySetting',
  state: initialState,
  effects: {
    *loadData(_, { call, put }) {
      const myCategories = yield call(load, { key: 'myCategories' });
      const categories = yield call(load, { key: 'categories' });
      if (myCategories) {
        yield put({
          type: 'setState',
          payload: {
            myCategories,
            categories,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            categories,
          },
        });
      }
    },
    *toggle({ payload }, { put, select }) {
      const categorySetting = yield select(
        ({ categorySetting }: RootState) => categorySetting,
      );
      yield put({
        type: 'setState',
        payload: {
          isEdit: !categorySetting.isEdit,
          myCategories:payload.myCategories,
        },
      })
      if (categorySetting.isEdit) {
        console.log('save')
        storage.save({
          key: 'myCategories',
          data: payload.myCategories,
        })
      }
    },
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadData' });
    },
    asyncStorage() {
      storage.sync.categories = async () => {
        const data = await axios.get(CATEGORY_URl);
        return data.data;
      };
      storage.sync.myCategories = async () => {
        return null;
      };
    },
  },
};

export default categorySettingModel;
