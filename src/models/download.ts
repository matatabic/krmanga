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

let ExternalDirectoryPath = "";

if (Platform.OS === "android") {
    ExternalDirectoryPath = RNFS.ExternalDirectoryPath;
} else {
    ExternalDirectoryPath = RNFS.CachesDirectoryPath;
}


export interface IChapter {
    id: number;
    title: string;
    episode_total: number;
    chapter_num: number;
    disabled?: boolean;
}

interface DownloadState {
    chapterList: IChapter[];
    ids: number[];
    hasMore: boolean,
    refreshing: boolean;
}

interface DownloadModel extends Model {
    namespace: "download";
    state: DownloadState;
    reducers: {
        setState: Reducer<DownloadState>;
    };
    effects: {
        fetchChapterList: Effect;
        downTask: Effect;
    };
    subscriptions: SubscriptionsMapObject;
}


export const initialState = {
    chapterList: [],
    ids: [],
    hasMore: false,
    refreshing: false
};

const downloadModel: DownloadModel = {
    namespace: "download",
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
        *fetchChapterList(action, { call, put }) {
            const { payload } = action;
            const { refreshing } = payload;

            yield put({
                type: "setState",
                payload: {
                    refreshing
                }
            });
            let cacheList = yield call(storageLoad, { key: "cacheList" });

            const { data } = yield call(DownloadServices.getList, {
                book_id: payload.book_id
            });

            if (cacheList[`book-${payload.book_id}`]) {
                for (let i = 0; i < data.list.length; i++) {
                    if (cacheList[`book-${payload.book_id}`].indexOf(data.list[i].chapter_num) > -1) {
                        data.list[i].disabled = true;
                    }
                }
            }

            yield put({
                type: "setState",
                payload: {
                    chapterList: data.list,
                    refreshing: false
                }
            });

            if (action.callback) {
                action.callback();
            }
        },
        *downTask(action, { call, put, select }) {
            const { payload } = action;
            const { book_id, downloadList } = payload;

            Toast.show("已加入下载任务", {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true
            });

            const { chapterList: list } = yield select(
                (state: RootState) => state["download"]
            );

            yield _fileEx(`book-${book_id}`).then(res => {
                if (!res) {
                    _mkdir(`book-${book_id}`);
                }
            });

            for (let i = 0; i < downloadList.length; i++) {

                const bookName = `book-${book_id}`;
                const chapter = `chapter-${downloadList[i]}`;

                let cacheList = yield call(storageLoad, { key: "cacheList" });
                let bookCache = yield call(storageLoad, { key: "bookCache" });

                const { data } = yield call(EpisodeServices.getList, {
                    book_id: payload.book_id,
                    chapter_num: downloadList[i]
                });

                yield _fileEx(`book-${book_id}/${downloadList[i]}`).then(res => {
                    if (!res) {
                        _mkdir(`book-${book_id}/${downloadList[i]}`);
                    }
                });

                for (let n = 0; n < data.list.length; n++) {
                    const type = getFileType(data.list[n].image);
                    const path = `book-${book_id}/${downloadList[i]}/${n + 1}.${type}`;
                    yield _fileEx(path).then(is_file => {
                        if (!is_file) {
                            //下载book图片
                            _downloadFile(encodeURI(data.list[n].image), path).then(res => {
                                if (res.statusCode == 200) {
                                    _readDir(`book-${book_id}/${downloadList[i]}`).then(res => {
                                        if (res.length == data.list.length) {
                                            list[list.length - downloadList[i]].disabled = true;
                                            if (action.reload) {
                                                action.reload([...list]);
                                            }
                                            if (cacheList[bookName]) {
                                                cacheList = {
                                                    [bookName]: Array.from(new Set([...cacheList[bookName], downloadList[i]]))
                                                };
                                            } else {
                                                cacheList = {
                                                    [bookName]: [downloadList[i]]
                                                };
                                            }
                                            storage.save({
                                                key: "cacheList",
                                                data: cacheList
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            _readDir(`book-${book_id}/${downloadList[i]}`).then(res => {
                                if (res.length == data.list.length) {
                                    list[list.length - downloadList[i]].disabled = true;
                                    if (action.reload) {
                                        action.reload([...list]);
                                    }
                                    if (cacheList[bookName]) {
                                        cacheList = {
                                            [bookName]: Array.from(new Set([...cacheList[bookName], downloadList[i]]))
                                        };
                                    } else {
                                        cacheList = {
                                            [bookName]: [downloadList[i]]
                                        };
                                    }
                                    storage.save({
                                        key: "cacheList",
                                        data: cacheList
                                    });
                                }
                            });
                        }
                    });
                    data.list[n].image = `${ExternalDirectoryPath}/${path}`;
                }
                if (bookCache[bookName] === undefined) {
                    bookCache[bookName] = {};
                }

                //储存已下载的book数据
                Object.assign(bookCache[bookName], {
                    [chapter]: data
                });
                storage.save({
                    key: "bookCache",
                    data: bookCache
                });
            }

            yield put({
                type: "setState",
                payload: {
                    ids: []
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

export default downloadModel;
