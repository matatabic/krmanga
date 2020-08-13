import { Effect, Model } from "dva-core-ts";
import { Reducer } from "redux";
import { getBriefList} from '@/services/brief'

export interface IChapter {
  id: string;
  title: string;
  created_at: string;
}

interface BriefModelState {
  id: string;
  title: string;
  description: string;
  collected: boolean;
  markChapter: string;
  markIndex: string;
  serial:boolean;
  chapters: IChapter[];
}

interface BriefModel extends Model {
  namespace: 'brief';
  state: BriefModelState;
  reducers: {
    setState: Reducer<BriefModelState>;
  };
  effects: {
    fetchBrief: Effect;
  };
}

const initialState = {
  id: '',
  title: '',
  description: '',
  collected: false,
  markChapter: '',
  markIndex: '',
  serial:false,
  chapters: [],
};

const briefModel: BriefModel = {
  namespace: 'brief',
  state: initialState,
  effects: {
    *fetchBrief({payload}, { call, put }) {
      const { data } = yield call(getBriefList, payload);
      yield put({
        type: 'setState',
        payload: {
          ...data,
        },
      });
    },
  },
  reducers: {
    setState(state = initialState, { payload }) {
      return {
        ...state,
        ...payload,
      };

    },
  },
}

export default briefModel;
