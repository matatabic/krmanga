import {Effect, Model, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {storageLoad} from '@/config/storage';
import {RootState} from '@/models/index';
import CategoryServices from "@/services/category";


export interface ICategory {
    id: string;
    name: string;
    classify?: string;
}

export interface IStatus {
    id: string;
    title: string;
}

export interface ICategories {
    [key: string]: ICategory[];
}

interface CategorySettingModelState {
    isEdit: boolean;
    myCategories: ICategory[];
    categories: ICategories[];
    statusList: IStatus[];
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
        {id: '0', name: '全部'},
    ],
    categories: [],
    statusList: [],
};

const categorySettingModel: CategorySettingModel = {
    namespace: 'categorySetting',
    state: initialState,
    effects: {
        *loadData(_, {call, put}) {
            const myCategories = yield call(storageLoad, {key: 'myCategories'});
            const categories = yield call(storageLoad, {key: 'categories'});
            const statusList = yield call(storageLoad, {key: 'statusList'});
            if (myCategories) {
                yield put({
                    type: 'setState',
                    payload: {
                        myCategories,
                        categories,
                        statusList
                    },
                });
            } else {
                yield put({
                    type: 'setState',
                    payload: {
                        categories,
                        statusList
                    },
                });
            }
            storage.save({
                key: 'statusList',
                data: statusList,
            })
        },
        *toggle({payload}, {put, select}) {
            const categorySetting = yield select(
                ({categorySetting}: RootState) => categorySetting,
            );
            yield put({
                type: 'setState',
                payload: {
                    isEdit: !categorySetting.isEdit,
                    myCategories: payload.myCategories,
                },
            })
            if (categorySetting.isEdit) {
                storage.save({
                    key: 'myCategories',
                    data: payload.myCategories,
                })
            }
        },
    },
    reducers: {
        setState(state, {payload}) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    subscriptions: {
        setup({dispatch}) {
            dispatch({type: 'loadData'});
        },
        asyncStorage() {
            storage.sync.categories = async () => {
                const data = await CategoryServices.getTreeList();
                return data.data;
            };
            storage.sync.myCategories = async () => {
                return null;
            };
            storage.sync.statusList = async () => {
                const data = await CategoryServices.getStatus();
                return data.data.list;
            };
        },
    },
};

export default categorySettingModel;
