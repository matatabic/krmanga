import { Model, Effect, SubscriptionsMapObject } from "dva-core-ts";
import { Reducer } from "redux";
import { _deleteFile, _fileEx } from "@/utils/RNFSUtils";
import storage, { storageLoad } from "@/config/storage";
import { RootState } from "@/models/index";
import _ from "lodash";


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
    ids: number[];
    isEdit: boolean;
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
        delChapter: Effect;
    };
    subscriptions: SubscriptionsMapObject;
}


export const initialState = {
    chapterList: [],
    ids: [],
    isEdit: false,
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
        *fetchChapterList(action, { call, put }) {
            const { payload } = action;
            const { book_id, refreshing } = payload;

            yield put({
                type: "setState",
                payload: {
                    refreshing
                }
            });

            let data: any[] = [];
            let i = 0;

            let bookCache = yield call(storageLoad, { key: "bookCache" });
            console.log(bookCache);
            for (let chapter in bookCache[`book-${book_id}`]) {
                _fileEx(bookCache[`book-${book_id}`][chapter].list[0].image);
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
        *delChapter(action, { call, put, select }) {
            const { payload, type } = action;
            const { ids, book_id } = payload;
            const namespace = type.split("/")[0];
            const { chapterList: list } = yield select(
                (state: RootState) => state[namespace]
            );

            const bookName = `book-${book_id}`;

            let cacheList = yield call(storageLoad, { key: "cacheList" });
            let bookCache = yield call(storageLoad, { key: "bookCache" });
            const data = cacheList[bookName].filter((item: number) => ids.indexOf(item) == -1);
            cacheList[bookName] = data;
            const newData = list.filter((item: IChapter) => ids.indexOf(item.chapter_num) == -1);

            for (let chapter_num of ids) {
                yield delete bookCache[bookName][`chapter-${chapter_num}`];
                yield _deleteFile(`${bookName}/${chapter_num}`);
            }

            yield put({
                type: "setState",
                payload: {
                    chapterList: newData,
                    ids: [],
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

export default chapterManageModel;
