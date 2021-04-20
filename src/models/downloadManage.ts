import { Model, Effect, SubscriptionsMapObject } from "dva-core-ts";
import { Reducer } from "redux";
import DownloadServices from "@/services/download";
import { _downloadFile, _fileEx, _mkdir, _readDir } from "@/utils/RNFSUtils";
import EpisodeServices from "@/services/episode";
import storage, { storageLoad } from "@/config/storage";
import RNFS from "react-native-fs";
import { Platform } from "react-native";
import { RootState } from "@/models/index";
import Toast from "react-native-root-toast";
import { getFileType } from "@/utils/index";
import ShelfServices from "@/services/shelf";

// let ExternalDirectoryPath = "";
//
// if (Platform.OS === "android") {
//     ExternalDirectoryPath = RNFS.ExternalDirectoryPath;
// } else {
//     ExternalDirectoryPath = RNFS.CachesDirectoryPath;
// }
const ExternalDirectoryPath = RNFS.DocumentDirectoryPath;

export interface IDownList {
    book_id: number;
    title: string;
    image: string;
    roast: number;
    author: string;
    chapter_num: number;
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
    };
    effects: {
        fetchDownloadList: Effect;
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
        }
    },
    effects: {
        *fetchDownloadList(action, { call, put, select }) {
            const { payload, type } = action;
            const { refreshing } = payload;

            let cache = [];
            let cacheList = yield call(storageLoad, { key: "cacheList" });

            for (let key in cacheList) {
                cache.push(key.slice(5));
            }
            const namespace = type.split("/")[0];

            const { downloadList: list, pagination } = yield select(
                (state: RootState) => state[namespace]
            );

            yield put({
                type: "setState",
                payload: {
                    refreshing
                }
            });

            const { data } = yield call(ShelfServices.getDownload, {
                ids: cache,
                page_size: 6,
                current_page: refreshing ? 1 : pagination.current_page + 1
            });

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
