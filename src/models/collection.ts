import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";
import { RootState } from "@/models/index";
import ShelfServices from "@/services/shelf";
import BriefServices from "@/services/brief";
import { StatusCode } from "@/utils/const";


export interface ICollection {
    id: number;
    book_id: number;
    title: string;
    image: string;
    chapter_info: string;
}

interface IPagination {
    current_page: number;
    page_size: number;
    total: number;
}

interface CollectionState {
    collectionList: ICollection[];
    hasMore: boolean;
    pagination: IPagination;
    screenReload: boolean;
    refreshing: boolean;
    ids: number[];
    isEdit: boolean;
}

interface CollectionModel extends Model {
    namespace: "collection";
    state: CollectionState;
    reducers: {
        setState: Reducer<CollectionState>;
        screenReload: Reducer<CollectionState>;
    };
    effects: {
        fetchCollectionList: Effect;
        delUserCollection: Effect;
    };
}


export const initialState = {
    collectionList: [],
    hasMore: false,
    pagination: {
        current_page: 0,
        page_size: 0,
        total: 0
    },
    screenReload: true,
    ids: [],
    refreshing: false,
    isEdit: false
};

const collectionModel: CollectionModel = {
    namespace: "collection",
    state: initialState,
    reducers: {
        setState(state = initialState, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        screenReload(state = initialState) {
            return {
                ...state,
                screenReload: true
            };
        }
    },
    effects: {
        *fetchCollectionList(action, { call, put, select }) {
            const { payload, type } = action;
            const { refreshing } = payload;

            const namespace = type.split("/")[0];

            const { collectionList: list, pagination, screenReload } = yield select(
                (state: RootState) => state[namespace]
            );

            if (refreshing && !screenReload) {
                return false;
            }

            yield put({
                type: "setState",
                payload: {
                    refreshing
                }
            });

            const { data } = yield call(ShelfServices.getCollection, {
                page_size: 9,
                current_page: refreshing ? 1 : pagination.current_page + 1
            });

            const newList = refreshing ? data.list : [...list, ...data.list];

            yield put({
                type: "setState",
                payload: {
                    collectionList: newList,
                    refreshing: false,
                    hasMore: data.pages.current_page * data.pages.page_size < data.pages.total,
                    screenReload: false,
                    pagination: {
                        current_page: data.pages.current_page,
                        page_size: data.pages.page_size,
                        total: data.pages.total
                    }
                }
            });

            if (action.callback) {
                action.callback();
            }
        },
        *delUserCollection(action, { call, put, select }) {
            const { payload, type } = action;

            const namespace = type.split("/")[0];

            const { collectionList: list } = yield select(
                (state: RootState) => state[namespace]
            );

            let idsString = "";
            for (let i of payload.ids) {
                idsString += `${i},`;
            }

            const data = yield call(BriefServices.delUserCollection, { id: idsString });
            if (data.code === StatusCode.SUCCESS) {
                const newList = list.filter((item: ICollection) => {
                    return payload.ids.indexOf(item.id) === -1;
                });
                yield put({
                    type: "setState",
                    payload: {
                        collectionList: newList,
                        isEdit: false
                    }
                });
            }
        }
    }

};

export default collectionModel;
