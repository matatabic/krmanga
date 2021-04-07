import { Effect, Model } from "dva-core-ts";
import { Reducer } from "redux";
import BriefServices from "@/services/brief";
import { StatusCode } from "@/utils/const";
import Toast from "react-native-root-toast";


export interface IChapter {
    id: number;
    title: string;
    roast: number;
    chapter_num: number;
    created_at: string;
}

export interface IBookInfo {
    id: number,
    title: string,
    image: string,
    category: string,
    author: string,
    description: string,
    status: string,
}

export interface BriefState {
    bookInfo: IBookInfo;
    headerHeight: number;
    book_update_info: string;
    refreshing: boolean;
    collection_id: number;
    markChapterNum: number;
    markRoast: number;
    chapterList: IChapter[];
}

interface CategoryModel extends Model {
    namespace: "brief";
    state: BriefState;
    reducers: {
        setState: Reducer<BriefState>;
        setCollectionId: Reducer<BriefState>;
    };
    effects: {
        fetchBrief: Effect;
        addUserCollection: Effect;
        delUserCollection: Effect;
    };
}

export const initialState = {
    bookInfo: {
        id: 0,
        title: "",
        image: "",
        category: "",
        author: "",
        description: "",
        status: ""
    },
    headerHeight: 0,
    refreshing: false,
    book_update_info: "",
    collection_id: 0,
    markChapterNum: 0,
    markRoast: 0,
    chapterList: []
};

const briefModel: CategoryModel = {
    namespace: "brief",
    state: initialState,
    reducers: {
        setState(state = initialState, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        setCollectionId(state = initialState, { payload }) {
            return {
                ...state,
                collection_id: payload.collection_id
            };
        }
    },
    effects: {
        *fetchBrief(action, { call, put }) {
            const { payload } = action;
            const { refreshing } = payload;

            yield put({
                type: "setState",
                payload: {
                    refreshing
                }
            });

            const { data } = yield call(BriefServices.getList, {
                book_id: payload.book_id
            });

            yield put({
                type: "setState",
                payload: {
                    ...data,
                    refreshing: false
                }
            });

            if (action.callback) {
                action.callback();
            }
        },
        *addUserCollection({ payload }, { call, put }) {
            const data = yield call(BriefServices.addUserCollection, payload);
            Toast.show(data.msg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true
            });
            if (data.code === StatusCode.SUCCESS) {
                yield put({
                    type: "setCollectionId",
                    payload: {
                        collection_id: data.data
                    }
                });
            }
        },
        *delUserCollection({ payload }, { call, put }) {
            const data = yield call(BriefServices.delUserCollection, payload);
            Toast.show(data.msg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true
            });
            if (data.code === StatusCode.SUCCESS) {
                yield put({
                    type: "setCollectionId",
                    payload: {
                        collection_id: 0
                    }
                });
            }
        }
    }
};

export default briefModel;
