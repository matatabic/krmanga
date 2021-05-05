import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";
import EpisodeServices from "@/services/episode";
import { RootState } from "@/models/index";
import realm, { IEpisode as Ie } from "@/config/realm";


export interface IEpisode {
    id: number;
    image: string;
    roast: number;
    number: number;
    chapter_id: number;
    chapter_num: number;
    episode_total: number;
    chapter_total: number;
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
    headerHeight: number;
    refreshing: boolean;
    hasMore: boolean;
    currentEpisodeTotal: number;
    currentChapterNum: number;
    currentChapterId: number;
    currentNumber: number;
    currentRoast: number;
    currentTitle: string;
    showCurrentNumber: number;
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
        changeCurrentNumber: Effect;
    };
}

export const initialState = {
    episodeList: [],
    headerHeight: 0,
    refreshing: false,
    hasMore: false,
    currentEpisodeTotal: 0,
    currentChapterNum: 0,
    currentChapterId: 0,
    currentNumber: 0,
    currentRoast: 0,
    currentTitle: "",
    showCurrentNumber: 0,
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
            const { book_id, chapter_num, markRoast } = payload;
            const { refreshing } = payload;
            console.log(payload);
            // return false;
            let data: any = {
                list: [],
                pages: {}
            };

            let { episodeList: list } = yield select(
                (state: RootState) => state["mangaView"]
            );

            const episodeList = realm.objects<Ie>("Episode").filtered(`book_id=${book_id} AND chapter_num=${chapter_num}`)
                .sorted("number");

            if (episodeList.length > 0) {
                data.list = episodeList;
                if (markRoast) {
                    const record = episodeList.filter((item: Ie) => item.roast === markRoast);
                    data.pages.current_title = record[0].title;
                    data.pages.current_chapter_id = record[0].chapter_id;
                    data.pages.current_chapter = record[0].chapter_num;
                    data.pages.episode_offset = record[0].number;
                    data.pages.episode_total = record[0].episode_total;
                    data.pages.chapter_total = record[0].chapter_total;
                } else {
                    data.pages.current_title = episodeList[0].title;
                    data.pages.current_chapter_id = episodeList[0].chapter_id;
                    data.pages.current_chapter = episodeList[0].chapter_num;
                    data.pages.episode_offset = episodeList[0].number;
                    data.pages.episode_total = episodeList[0].episode_total;
                    data.pages.chapter_total = episodeList[0].chapter_total;
                }
            } else {
                const retData = yield call(EpisodeServices.getList, {
                    book_id,
                    chapter_num,
                    roast: markRoast
                });
                data = retData.data;
            }
            const newList = refreshing ? data.list : [...list, ...data.list];

            if (refreshing) {
                yield put({
                    type: "setState",
                    payload: {
                        currentEpisodeTotal: data.pages.episode_total,
                        currentChapterNum: data.pages.current_chapter,
                        currentChapterId: data.pages.current_chapter_id,
                        currentNumber: data.pages.episode_offset,
                        showCurrentNumber: data.pages.episode_offset,
                        currentTitle: data.pages.current_title,
                        currentRoast: payload.roast
                    }
                });
            }

            yield put({
                type: "setState",
                payload: {
                    episodeList: newList,
                    hasMore: data.pages.current_chapter < data.pages.chapter_total,
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
        *changeCurrentNumber(action, { _, put, select }) {
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
                action.callback(index);
            }
        }
    }
};

export default mangaViewModel;
