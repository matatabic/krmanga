import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";
import { _readDir, _deleteFile } from "@/utils/RNFSUtils";
import { RootState } from "@/models/index";
import ShelfServices from "@/services/shelf";
import realm, { IBook } from "@/config/realm";


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

            let cache: number[] = [];
            let bookList = realm.objects<IBook>("Book");

            bookList.forEach(item => cache.push(item.id));

            if (cache.length === 0) {
                yield put({
                    type: "setState",
                    payload: {
                        refreshing: false,
                        screenReload: false
                    }
                });
                return false;
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
        *delBookCache(action, { _, put, select }) {
            const { payload, type } = action;
            const { ids } = payload;
            const namespace = type.split("/")[0];

            const { downloadList: list } = yield select(
                (state: RootState) => state[namespace]
            );

            for (let book_id of ids) {
                realm.write(() => {
                    realm.delete(realm.objects("Book").filtered(`id=${book_id}`));
                    realm.delete(realm.objects("Chapter").filtered(`book_id=${book_id}`));
                    realm.delete(realm.objects("Episode").filtered(`book_id=${book_id}`));
                });
                yield _deleteFile(`book-${book_id}`);
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
        }
    }
};

export default downloadManageModel;
