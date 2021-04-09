import { Effect, Model, SubscriptionsMapObject } from "dva-core-ts";
import { Reducer } from "redux";
import storage, { storageLoad } from "@/config/storage";
import { RootState } from "@/models/index";
import CategoryServices from "@/services/category";


export interface ICategory {
    id: number;
    name: string;
    typeName?: string;
}

export interface IStatus {
    id: number;
    title: string;
}

export interface ICategoryList {
    [key: string]: ICategory[];
}

interface CategorySettingModelState {
    isEdit: boolean;
    myCategoryList: ICategory[];
    categoryList: ICategory[];
    statusList: IStatus[];
}

interface CategorySettingModel extends Model {
    namespace: "categorySetting";
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
    myCategoryList: [
        { id: 0, name: "全部" }
    ],
    categoryList: [],
    statusList: []
};

const categorySettingModel: CategorySettingModel = {
    namespace: "categorySetting",
    state: initialState,
    effects: {
        *loadData(_, { call, put }) {
            const myCategoryList = yield call(storageLoad, { key: "myCategoryList" });
            const categoryList = yield call(storageLoad, { key: "categoryList" });
            const statusList = yield call(storageLoad, { key: "statusList" });
            if (myCategoryList) {
                yield put({
                    type: "setState",
                    payload: {
                        myCategoryList,
                        categoryList,
                        statusList
                    }
                });
            } else {
                yield put({
                    type: "setState",
                    payload: {
                        categoryList,
                        statusList
                    }
                });
            }
            storage.save({
                key: "statusList",
                data: statusList
            });
        },
        *toggle({ payload }, { put, select }) {
            const categorySetting = yield select(
                ({ categorySetting }: RootState) => categorySetting
            );
            yield put({
                type: "setState",
                payload: {
                    isEdit: !categorySetting.isEdit,
                    myCategoryList: payload.myCategoryList
                }
            });
            if (categorySetting.isEdit) {
                storage.save({
                    key: "myCategoryList",
                    data: payload.myCategoryList
                });
            }
        }
    },
    reducers: {
        setState(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: "loadData" });
        },
        asyncStorage() {
            storage.sync.categoryList = async () => {
                const data = await CategoryServices.getTreeList();
                return data.data.list;
            };
            storage.sync.myCategoryList = async () => {
                return null;
            };
            storage.sync.statusList = async () => {
                const data = await CategoryServices.getStatus();
                return data.data.list;
            };
        }
    }
};

export default categorySettingModel;
