import { Model, Effect } from "dva-core-ts";
import { Reducer } from "redux";
import { RootState } from "@/models/index";
import ShelfServices from "@/services/shelf";
import { StatusCode } from "@/utils/const";


export interface IHistory {
    id: number;
    book_id: number;
    title: string;
    image: string;
    chapter_id: number;
    chapter_num: number;
    roast: number;
}

export interface IHistoryList {
    title: string;
    data: IHistory[][];
}

interface IPagination {
    current_page: number;
    page_size: number;
    total: number;
}

interface HistoryState {
    historyList: IHistoryList[];
    hasMore: boolean;
    pagination: IPagination;
    screenReload: boolean;
    refreshing: boolean;
    ids: number[];
    isEdit: boolean;
}

interface HistoryModel extends Model {
    namespace: "history";
    state: HistoryState;
    reducers: {
        setState: Reducer<HistoryState>;
        setScreenReload: Reducer<HistoryState>;
    };
    effects: {
        fetchHistoryList: Effect;
        delUserHistory: Effect;
    };
}


export const initialState = {
    historyList: [],
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

const historyModel: HistoryModel = {
    namespace: "history",
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
        *fetchHistoryList(action, { call, put, select }) {
            const { payload, type } = action;
            const { refreshing } = payload;

            const namespace = type.split("/")[0];

            const { historyList: list, pagination, screenReload } = yield select(
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

            const { data } = yield call(ShelfServices.getHistory, {
                page_size: 6,
                current_page: refreshing ? 1 : pagination.current_page + 1
            });

            let newList = [];

            if (refreshing) {
                newList = data.list;
            } else {
                newList = [...list, ...data.list];
                newList = newList.reduce((pre, cur) => {
                    const index = pre.findIndex((i: { title: string }) => cur.title === i.title);
                    if (index < 0) {
                        pre.push(cur);
                    } else {
                        pre[index].data = pre[index].data.concat(cur.data);
                    }
                    return pre;
                }, []);
            }

            yield put({
                type: "setState",
                payload: {
                    historyList: newList,
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
        *delUserHistory(action, { call, put, select }) {
            const { payload, type } = action;

            const namespace = type.split("/")[0];

            const { historyList: list } = yield select(
                (state: RootState) => state[namespace]
            );

            let idsString = "";
            for (let i of payload.ids) {
                idsString += `${i},`;
            }

            const data = yield call(ShelfServices.delUserHistory, { book_id: idsString });
            if (data.code === StatusCode.SUCCESS) {
                let n = 0;
                let newList: IHistoryList[] = [];
                list.forEach((items: IHistoryList) => {
                    let data = items.data.filter(item => payload.ids.indexOf(item["book_id"]) === -1);
                    if (data.length !== 0) {
                        newList[n] = { title: items.title, data: data };
                        n++;
                    }
                });

                yield put({
                    type: "setState",
                    payload: {
                        historyList: newList,
                        isEditHistory: false
                    }
                });
            }
        }
    }

};

export default historyModel;
