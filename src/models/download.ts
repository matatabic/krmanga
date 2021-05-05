import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";
import { _downBookImage, _downEpisodeImage, _fileEx, _mkdir } from "@/utils/RNFSUtils";
import DownloadServices  from "@/services/download";
import { RootState } from "@/models/index";
import Toast from "react-native-root-toast";
import realm, {  IChapter as Ic, saveData } from "@/config/realm";


export interface IChapter {
    id: number;
    title: string;
    episode_total: number;
    chapter_num: number;
    disabled?: boolean;
    downloading?: boolean;
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


            const { data } = yield call(DownloadServices.getChapterList, {
                book_id: payload.book_id
            });


            const cacheList = realm.objects<Ic>("Chapter").filtered(`book_id=${payload.book_id} AND cache=1`);

            let cache: number[] = [];
            cacheList.forEach(item => {
                cache.push(item.chapter_num);
            });

            if (cache.length > 0) {
                for (let i = 0; i < data.list.length; i++) {
                    if (cache.indexOf(data.list[i].chapter_num) > -1) {
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

            list.map((item: IChapter) => {
                if (downloadList.indexOf(item.chapter_num) > -1) {
                    return item.downloading = true;
                }
                return item;
            });

            yield put({
                type: "setState",
                payload: {
                    chapterList: [...list]
                }
            });

            if (action.changeDownload) {
                action.changeDownload();
            }

            yield _fileEx(`bookCover`).then(res => {
                if (!res) {
                    _mkdir("bookCover");
                }
            });

            yield _fileEx(`book-${book_id}`).then(res => {
                if (!res) {
                    _mkdir(`book-${book_id}`);
                }
            });

            for (let i = 0; i < downloadList.length; i++) {
                yield _fileEx(`book-${book_id}/${downloadList[i]}`).then(res => {
                    if (!res) {
                        _mkdir(`book-${book_id}/${downloadList[i]}`);
                    }
                });
            }

            const { data } = yield call(DownloadServices.getList, {
                book_id: payload.book_id,
                chapter_num: downloadList
            });

            saveData("Book", data.book);
            _downBookImage(data.book, data.book.image);

            for (let chapter of data.chapter) {
                saveData("Chapter", { ...chapter, book_id });
            }

            for (let episode of data.episode) {
                saveData("Episode", { ...episode, book_id });
                _downEpisodeImage(episode, book_id, list, action.callBack);
            }
        }
    }
};

export default downloadModel;
