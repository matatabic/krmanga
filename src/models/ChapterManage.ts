import { Model, Effect, SubscriptionsMapObject } from "dva-core-ts";
import { Reducer } from "redux";
import { _downloadFile, _fileEx, _mkdir, _readDir, _deleteFile } from "@/utils/RNFSUtils";
import storage, { storageLoad } from "@/config/storage";
import RNFS from "react-native-fs";
import { RootState } from "@/models/index";
import _ from "lodash";

const ExternalDirectoryPath = RNFS.DocumentDirectoryPath;

export interface IChapter {
    chapter_num: number;
    image: string;
    size: number;
}

interface IPagination {
    current_page: number;
    page_size: number;
    total: number;
}

interface ChapterManageState {
    chapterList: IChapter[];
    hasMore: boolean;
    pagination: IPagination;
    refreshing: boolean;
}

interface ChapterManageModel extends Model {
    namespace: "chapterManage";
    state: ChapterManageState;
    reducers: {
        setState: Reducer<ChapterManageState>;
    };
    effects: {
        fetchChapterList: Effect;
        delBookCache: Effect;
    };
    subscriptions: SubscriptionsMapObject;
}


export const initialState = {
    chapterList: [],
    hasMore: false,
    pagination: {
        current_page: 0,
        page_size: 0,
        total: 0
    },
    refreshing: false
};

const chapterManageModel: ChapterManageModel = {
    namespace: "chapterManage",
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
        *fetchChapterList(action, { call, put, select }) {
            const { payload, type } = action;
            const { book_id, refreshing } = payload;

            const namespace = type.split("/")[0];

            const { chapterList: list, pagination, screenReload } = yield select(
                (state: RootState) => state[namespace]
            );

            yield put({
                type: "setState",
                payload: {
                    refreshing
                }
            });

            let data: any[] = [];
            let i = 0;

            let bookCache = yield call(storageLoad, { key: "bookCache" });

            for (let chapter in bookCache[`book-${book_id}`]) {
                // const n =
                // console.log(bookCache[`book-${book_id}`][chapter])
                // data[n] = {
                //     "length": bookCache[`book-${book_id}`][chapter].list.length,
                //     "image": bookCache[`book-${book_id}`][chapter].list[0].image
                // };
                data[i] = [];
                data[i]["size"] = bookCache[`book-${book_id}`][chapter].list.length;
                data[i]["image"] = bookCache[`book-${book_id}`][chapter].list[0].image;
                data[i]["chapter_num"] = parseInt(chapter.slice(8));
                i++;
            }

            data = _.sortBy(data, ["chapter_num"]);

            yield put({
                type: "setState",
                payload: {
                    chapterList: data,
                    refreshing: false
                }
            });

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

export default chapterManageModel;
