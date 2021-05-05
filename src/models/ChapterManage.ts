import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";
import { _deleteFile } from "@/utils/RNFSUtils";
import { RootState } from "@/models/index";
import realm, { IChapter } from "@/config/realm";


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
        *fetchChapterList(action, { _, put }) {
            const { payload } = action;
            const { book_id, refreshing } = payload;

            yield put({
                type: "setState",
                payload: {
                    refreshing
                }
            });

            const chapterList = realm.objects<IChapter>("Chapter").filtered(`book_id=${book_id}`)
                .sorted("chapter_num", true);

            yield put({
                type: "setState",
                payload: {
                    chapterList: chapterList,
                    refreshing: false
                }
            });
        },
        *delChapter(action, { _, put, select }) {
            const { payload, type } = action;
            const { ids, book_id } = payload;
            const namespace = type.split("/")[0];
            const { chapterList: list } = yield select(
                (state: RootState) => state[namespace]
            );

            for (let chapter_num of ids) {
                realm.write(() => {
                    realm.delete(realm.objects("Chapter").filtered(`book_id=${book_id} AND chapter_num=${chapter_num}`));
                    realm.delete(realm.objects("Episode").filtered(`book_id=${book_id} AND chapter_num=${chapter_num}`));
                });
                yield _deleteFile(`book-${book_id}/${chapter_num}`);
            }

            const newData = list.filter((item: IChapter) => ids.indexOf(item.chapter_num) == -1);

            yield put({
                type: "setState",
                payload: {
                    chapterList: newData,
                    ids: [],
                    isEdit: false
                }
            });

        }
    }
};

export default chapterManageModel;
