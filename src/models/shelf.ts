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

export interface IHistory {
    id: number;
    book_id: number;
    title: string;
    image: string;
    chapter_id: number;
    chapter_num: number;
    roast: number;
}


export interface IHistoryList {
    title: string;
    data: IHistory[][];
}

interface IPagination {
    current_page: number;
    page_size: number;
    total: number;
}

interface ShelfState {
    collectionList: ICollection[];
    historyList: IHistoryList[];
    collectionHasMore: boolean;
    collectionPagination: IPagination;
    collectionScreenReload: boolean;
    historyHasMore: boolean;
    historyPagination: IPagination;
    historyScreenReload: boolean;
    refreshing: boolean;
    ids: number[];
    isEditCollection: boolean;
    isEditHistory: boolean;
    activePage: number,
}

interface ShelfModel extends Model {
    namespace: "shelf";
    state: ShelfState;
    reducers: {
        setState: Reducer<ShelfState>;
        setIds: Reducer<ShelfState>;
        setActivePage: Reducer<ShelfState>;
        setCollectionScreenReload: Reducer<ShelfState>;
        setHistoryScreenReload: Reducer<ShelfState>;
        initData: Reducer<ShelfState>;
    };
    effects: {
        fetchCollectionList: Effect;
        fetchHistoryList: Effect;
        delUserCollection: Effect;
        delUserHistory: Effect;
    };
}


export const initialState = {
    collectionList: [],
    historyList: [],
    collectionHasMore: false,
    collectionPagination: {
        current_page: 0,
        page_size: 0,
        total: 0
    },
    collectionScreenReload: true,
    historyHasMore: false,
    historyPagination: {
        current_page: 0,
        page_size: 0,
        total: 0
    },
    historyScreenReload: true,
    ids: [],
    refreshing: false,
    isEditCollection: false,
    isEditHistory: false,
    activePage: 1
};

const shelfModel: ShelfModel = {
    namespace: "shelf",
    state: initialState,
    reducers: {
        setState(state = initialState, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        setIds(state = initialState, { payload }) {
            return {
                ...state,
                ids: payload.ids
            };
        },
        setActivePage(state = initialState, { payload }) {
            return {
                ...state,
                activePage: payload.activePage,
                isEditCollection: payload.isEditCollection,
                isEditHistory: payload.isEditHistory,
                ids: []
            };
        },
        setCollectionScreenReload(state = initialState) {
            return {
                ...state,
                collectionScreenReload: true
            };
        },
        setHistoryScreenReload(state = initialState) {
            return {
                ...state,
                historyScreenReload: true
            };
        },
        initData(state = initialState) {
            return {
                ...state
            };
        }
    },
    effects: {
        *fetchCollectionList(action, { call, put, select }) {
            const { payload, type } = action;
            const { refreshing } = payload;

            const namespace = type.split("/")[0];

            const { collectionList: list, collectionPagination: pagination, collectionScreenReload: reload } = yield select(
                (state: RootState) => state[namespace]
            );

            if (refreshing && !reload) {
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
                    collectionHasMore: data.pages.current_page * data.pages.page_size < data.pages.total,
                    collectionScreenReload: false,
                    collectionPagination: {
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
        *fetchHistoryList(action, { call, put, select }) {
            const { payload, type } = action;
            const { refreshing } = payload;

            const namespace = type.split("/")[0];

            const { historyList: list, historyPagination: pagination, historyScreenReload: reload } = yield select(
                (state: RootState) => state[namespace]
            );

            if (refreshing && !reload) {
                return false;
            }

            yield put({
                type: "setState",
                payload: {
                    refreshing
                }
            });

            const { data } = yield call(ShelfServices.getHistory, {
                page_size: 6,
                current_page: refreshing ? 1 : pagination.current_page + 1
            });


            let newList = [];

            if (refreshing) {
                newList = data.list;
            } else {
                newList = [...list, ...data.list];
                newList = newList.reduce((pre, cur) => {
                    const index = pre.findIndex((i: { title: string }) => cur.title === i.title);
                    if (index < 0) {
                        pre.push(cur);
                    } else {
                        pre[index].data = pre[index].data.concat(cur.data);
                    }
                    return pre;
                }, []);
            }

            yield put({
                type: "setState",
                payload: {
                    historyList: newList,
                    refreshing: false,
                    historyHasMore: data.pages.current_page * data.pages.page_size < data.pages.total,
                    historyScreenReload: false,
                    historyPagination: {
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
                        isEditCollection: false
                    }
                });
            }
        },
        *delUserHistory(action, { call, put, select }) {
            const { payload, type } = action;

            const namespace = type.split("/")[0];

            const { historyList: list } = yield select(
                (state: RootState) => state[namespace]
            );

            let idsString = "";
            for (let i of payload.ids) {
                idsString += `${i},`;
            }

            const data = yield call(ShelfServices.delUserHistory, { book_id: idsString });
            if (data.code === StatusCode.SUCCESS) {
                let n = 0;
                let newList: IHistoryList[] = [];
                list.forEach((items: IHistoryList) => {
                    let data = items.data.filter(item => payload.ids.indexOf(item["book_id"]) === -1);
                    if (data.length !== 0) {
                        newList[n] = { title: items.title, data: data };
                        n++;
                    }
                });

                yield put({
                    type: "setState",
                    payload: {
                        historyList: newList,
                        isEditHistory: false
                    }
                });
            }
        }
    }

};

export default shelfModel;
