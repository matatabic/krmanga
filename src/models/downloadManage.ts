import { Model, Effect, SubscriptionsMapObject } from "dva-core-ts";
import { Reducer } from "redux";
import { _downloadFile, _fileEx, _mkdir, _readDir, _deleteFile } from "@/utils/RNFSUtils";
import storage, { storageLoad } from "@/config/storage";
import { RootState } from "@/models/index";
import ShelfServices from "@/services/shelf";


export interface IDownList {
    book_id: number;
    title: string;
    image: string;
    roast?: number;
    author: string;
    cacheLength: string;
    chapter_num?: number;
    chapter_total: number;
    created_at: string;
}

interface IPagination {
    current_page: number;
    page_size: number;
    total: number;
}

interface DownloadManageState {
    downloadList: IDownList[];
    hasMore: boolean;
    pagination: IPagination;
    screenReload: boolean;
    refreshing: boolean;
    ids: number[];
    isEdit: boolean;
}

interface DownloadManageModel extends Model {
    namespace: "downloadManage";
    state: DownloadManageState;
    reducers: {
        setState: Reducer<DownloadManageState>;
        setScreenReload: Reducer<DownloadManageState>;
    };
    effects: {
        fetchDownloadList: Effect;
        delBookCache: Effect;
    };
    subscriptions: SubscriptionsMapObject;
}


export const initialState = {
    downloadList: [],
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

const downloadManageModel: DownloadManageModel = {
    namespace: "downloadManage",
    state: initialState,
    reducers: {
        setState(state = initialState, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        setScreenReload(state = initialState) {
            return {
                ...state,
                screenReload: true
            };
        }
    },
    effects: {
        *fetchDownloadList(action, { call, put, select }) {
            const { payload, type } = action;
            const { refreshing } = payload;

            const namespace = type.split("/")[0];

            const { downloadList: list, pagination, screenReload } = yield select(
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

            let cache = [];
            let cacheList = yield call(storageLoad, { key: "cacheList" });

            for (let key in cacheList) {
                cache.push(key.slice(5));
            }

            const { data } = yield call(ShelfServices.getDownload, {
                ids: cache,
                page_size: 6,
                current_page: refreshing ? 1 : pagination.current_page + 1
            });

            for (let key in data.list) {
                yield _readDir(`book-${data.list[key].book_id}`).then(res => {
                    data.list[key].cacheLength = res.length;
                });
            }

            const newList = refreshing ? data.list : [...list, ...data.list];

            yield put({
                type: "setState",
                payload: {
                    downloadList: newList,
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
        *delBookCache(action, { call, put, select }) {
            const { payload, type } = action;
            const { ids } = payload;
            const namespace = type.split("/")[0];

            const { downloadList: list } = yield select(
                (state: RootState) => state[namespace]
            );

            let cacheList = yield call(storageLoad, { key: "cacheList" });
            let bookCache = yield call(storageLoad, { key: "bookCache" });

            for (let book_id of ids) {
                _deleteFile(`book-${book_id}`);
                delete cacheList[`book-${book_id}`];
                delete bookCache[`book-${book_id}`];
            }

            const newList = list.filter((item: IDownList) => {
                return payload.ids.indexOf(item.book_id) === -1;
            });

            yield put({
                type: "setState",
                payload: {
                    downloadList: newList,
                    isEdit: false
                }
            });

            storage.save({
                key: "cacheList",
                data: cacheList
            });
            storage.save({
                key: "bookCache",
                data: bookCache
            });
        }
    },
    subscriptions: {
        asyncStorage() {
            storage.sync.cacheList = async () => {
                return {};
            };
            storage.sync.bookCache = async () => {
                return {};
            };
        }
    }
};

export default downloadManageModel;
