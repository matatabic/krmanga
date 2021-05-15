import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";
import BookServices from "@/services/book";
import { RootState } from "@/models/index";


export interface IBook {
    id: number;
    title: string;
    image: string;
    author: string;
    status: string;
    category: string;
    statusColor: string;
}

export interface GuessState {
    bookList: IBook[];
    refreshing: boolean;
    hasMore: boolean,
}

interface GuessModel extends Model {
    namespace: "guess";
    state: GuessState;
    reducers: {
        setState: Reducer<GuessState>;
    };
    effects: {
        fetchGuessList: Effect;
    };
}


export const initialState = {
    bookList: [],
    refreshing: false,
    hasMore: true
};

const GuessModel: GuessModel = {
    namespace: "guess",
    state: initialState,
    reducers: {
        setState(state = initialState, { payload }) {
            return {
                ...state,
                ...payload
            };
        }
    },
    effects: {
        *fetchGuessList(action, { call, put, select }) {
            const { payload } = action;
            const { refreshing } = payload;

            const { bookList: list } = yield select(
                (state: RootState) => state["guess"]
            );

            yield put({
                type: "setState",
                payload: {
                    refreshing
                }
            });

            const { harmony } = yield select(
                (state: RootState) => state["mine"]
            );

            const { data } = yield call(BookServices.getGuess, {
                is_show: harmony ? 0 : 1
            });

            const newList = refreshing ? data.list : [...list, ...data.list];

            yield put({
                type: "setState",
                payload: {
                    bookList: newList,
                    refreshing: false
                }
            });

            if (action.callback) {
                action.callback();
            }
        }
    }

};

export default GuessModel;
