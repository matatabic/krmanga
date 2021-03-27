import { Model, Effect, SubscriptionsMapObject } from "dva-core-ts";
import { Reducer } from "redux";
import BookServices from "@/services/book";
import { RootState } from "@/models/index";
import storage, { storageLoad } from "@/config/storage";


export interface IPagination {
    current_page: number;
    page_size: number;
    total: number;

}

export interface IBook {
    id: number;
    title: string;
    image: string;
    author: string;
    category: string;
    status: string;
    statusColor: string;
}

export interface IIntro {
    [key: string]: IBook[];
}

export interface SearchState {
    introList: IIntro[];
    simpleList: IBook[];
    bookList: IBook[];
    searchHistoryList: string[];
    searchTitle: string;
    refreshing: boolean;
    showSimpleView: boolean,
    showBookView: boolean,
    hasMore: boolean,
    pagination: IPagination;
}

interface SearchModel extends Model {
    namespace: "search";
    state: SearchState;
    reducers: {
        setState: Reducer<SearchState>;
        addSearch: Reducer<SearchState>;
        deleteHistory: Reducer<SearchState>;
        destroyHistory: Reducer<SearchState>;
    };
    effects: {
        loadData: Effect;
        fetchIntroList: Effect;
        fetchSimpleList: Effect;
        fetchBookList: Effect;
    };
    subscriptions: SubscriptionsMapObject;
}


export const initialState = {
    introList: [],
    simpleList: [],
    bookList: [],
    searchHistoryList: [],
    searchTitle: "",
    refreshing: false,
    showSimpleView: false,
    showBookView: false,
    hasMore: false,
    pagination: {
        current_page: 1,
        page_size: 9,
        total: 0
    }
};

const searchModel: SearchModel = {
    namespace: "search",
    state: initialState,
    reducers: {
        setState(state = initialState, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        addSearch(state = initialState, { payload }) {
            let searchHistoryList = state.searchHistoryList;
            searchHistoryList.unshift(payload.title);
            storage.save({
                key: "searchHistoryList",
                data: searchHistoryList
            });
            return {
                ...state,
                searchHistoryList
            };
        },
        deleteHistory(state = initialState, { payload }) {
            const searchHistoryList = state.searchHistoryList.filter((item: string, index: number) => index != payload.index);
            storage.save({
                key: "searchHistoryList",
                data: searchHistoryList
            });
            return {
                ...state,
                searchHistoryList
            };
        },
        destroyHistory(state = initialState) {
            storage.save({
                key: "searchHistoryList",
                data: []
            });
            return {
                ...state,
                searchHistoryList: []
            };
        }
    },
    effects: {
        *loadData(_, { call, put }) {
            const searchHistoryList = yield call(storageLoad, { key: "searchHistoryList" });
            if (searchHistoryList) {
                yield put({
                    type: "setState",
                    payload: {
                        searchHistoryList
                    }
                });
            }
        },
        *fetchIntroList(_, { call, put }) {
            const { data } = yield call(BookServices.getIntro);
            yield put({
                type: "setState",
                payload: {
                    introList: data
                }
            });
        },
        *fetchSimpleList({ payload }, { call, put }) {
            const { data } = yield call(BookServices.getList, {
                title: payload.searchTitle,
                page_size: 5,
                current_page: 1
            });

            yield put({
                type: "setState",
                payload: {
                    simpleList: data.list,
                    showSimpleView: data.list.length > 0
                }
            });
        },
        *fetchBookList(action, { call, put, select }) {
            const { payload } = action;
            const { refreshing } = payload;

            const { bookList: list, pagination } = yield select(
                (state: RootState) => state["search"]
            );

            yield put({
                type: "setState",
                payload: {
                    refreshing
                }
            });

            const page = refreshing ? { "current_page": 1 } : { "current_page": pagination.current_page + 1 };

            const { data } = yield call(BookServices.getList, { ...payload, ...page });

            const newList = refreshing ? data.list : [...list, ...data.list];

            yield put({
                type: "setState",
                payload: {
                    bookList: newList,
                    refreshing: false,
                    hasMore: data.pages.current_page * data.pages.page_size < data.pages.total,
                    pagination: {
                        current_page: data.pages.current_page,
                        page_size: data.pages.page_size,
                        total: data.pages.total
                    }
                }
            });

            if (action.addSearch) {
                if (data.list.length > 0) {
                    action.addSearch(true);
                }
            }
            if (action.callback) {
                action.callback();
            }
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: "loadData" });
        },
        asyncStorage() {
            storage.sync.searchHistoryList = async () => {
                return null;
            };
        }
    }
};

export default searchModel;
