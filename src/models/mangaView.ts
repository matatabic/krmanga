import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";
import EpisodeServices from "@/services/episode";
import { RootState } from "@/models/index";


export interface IEpisode {
    id: number;
    image: string;
    roast: number;
    number: number;
    chapter_id: number;
    chapter_num: number;
    episode_total: number;
    multiple: number;
    title: string;
}

export interface IPagination {
    current_chapter_id: number;
    current_chapter: number;
    episode_offset: number;
    episode_total: number;
    chapter_total: number;
    current_title: string;
}

export interface MangaViewState {
    episodeList: IEpisode[];
    refreshing: boolean;
    hasMore: boolean;
    currentEpisodeTotal: number;
    currentChapterNum: number;
    currentChapterId: number;
    currentNumber: number;
    currentRoast: number;
    currentTitle: string;
    panelEnable: boolean;
    pagination: IPagination;
}

interface MangaViewModel extends Model {
    namespace: "mangaView";
    state: MangaViewState;
    reducers: {
        setState: Reducer<MangaViewState>;
    };
    effects: {
        fetchEpisodeList: Effect;
        addHistory: Effect;
        setCurrentIndex: Effect;
    };
}

export const initialState = {
    episodeList: [],
    refreshing: false,
    hasMore: false,
    currentEpisodeTotal: 0,
    currentChapterNum: 0,
    currentChapterId: 0,
    currentNumber: 0,
    currentRoast: 0,
    currentTitle: "",
    panelEnable: true,
    pagination: {
        current_chapter_id: 0,
        current_chapter: 0,
        episode_offset: 0,
        episode_total: 0,
        chapter_total: 0,
        current_title: ""
    }
};

const mangaViewModel: MangaViewModel = {
    namespace: "mangaView",
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
        *fetchEpisodeList(action, { call, put, select }) {
            const { payload } = action;
            const { refreshing } = payload;

            let { episodeList: list } = yield select(
                (state: RootState) => state["mangaView"]
            );

            const { data } = yield call(EpisodeServices.getList, {
                book_id: payload.book_id,
                chapter_num: payload.chapter_num,
                roast: refreshing ? payload.roast : list[list.length - 1].roast + 1
            });

            const newList = refreshing ? data.list : [...list, ...data.list];

            yield put({
                type: "setState",
                payload: {
                    episodeList: newList,
                    hasMore: data.pages.current_chapter < data.pages.chapter_total,
                    currentEpisodeTotal: data.pages.episode_total,
                    currentChapterNum: data.pages.current_chapter,
                    currentChapterId: data.pages.current_chapter_id,
                    currentNumber: data.pages.episode_offset,
                    currentTitle: data.pages.current_title,
                    currentRoast: payload.roast,
                    pagination: data.pages
                }
            });

            if (action.callback) {
                action.callback();
            }
        },
        *addHistory({ payload }, { call, put, select }) {
            let { currentChapterId, currentChapterNum, currentRoast } = yield select(
                (state: RootState) => state["mangaView"]
            );

            yield call(EpisodeServices.saveMark, {
                book_id: payload.book_id,
                chapter_id: currentChapterId,
                chapter_num: currentChapterNum,
                roast: currentRoast
            });

            yield put({
                type: "setState",
                payload: {
                    ...initialState
                }
            });
        },
        *setCurrentIndex(action, { _, put, select }) {
            const { payload } = action;

            let { episodeList: list, currentChapterNum } = yield select(
                (state: RootState) => state["mangaView"]
            );
            const index = list.findIndex((item: IEpisode) => item.chapter_num === currentChapterNum && item.number === payload.currentNumber);

            yield put({
                type: "setState",
                payload: {
                    currentNumber: list[index].number
                }
            });

            if (action.callback) {
                action.debounce(() => {
                    action.callback(index);
                });
            }
        }
    }
};

export default mangaViewModel;
