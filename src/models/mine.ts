import { Model, Effect, SubscriptionsMapObject } from "dva-core-ts";
import { Reducer } from "redux";
import storage, { storageLoad } from "@/config/storage";


export interface MineState {
    harmony: boolean,
}

interface UserModel extends Model {
    namespace: "mine";
    state: MineState;
    reducers: {
        setState: Reducer<MineState>;
        changeHarmony: Reducer<MineState>;
    };
    effects: {
        loadData: Effect;
    };
    subscriptions: SubscriptionsMapObject;
}

const initialState = {
    harmony: false
};

const mineModel: UserModel = {
    namespace: "mine",
    state: initialState,
    reducers: {
        setState(state = initialState, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        changeHarmony(state = initialState, { payload }) {
            storage.save({
                key: "harmony",
                data: payload.harmony
            });
            return {
                ...state,
                ...payload
            };
        }
    },
    effects: {
        *loadData(_, { call, put }) {
            const harmony = yield call(storageLoad, { key: "harmony" });
            if (harmony != null) {
                yield put({
                    type: "setState",
                    payload: {
                        harmony
                    }
                });
            }
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: "loadData" });
        },
        asyncStorage() {
            storage.sync.harmony = async () => {
                return null;
            };
        }
    }
};

export default mineModel;
