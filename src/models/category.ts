import { Effect, Model } from "dva-core-ts";
import { Reducer } from "redux";
import { RootState } from "@/models/index";
import { IBook } from "@/models/home";
import BookServices from "@/services/book";


export interface IPagination {
    current_page: number;
    page_size: number;
    total: number;
}

export interface CategoryState {
    bookList: IBook[];
    loadDataList: string[];
    activeStatus: number;
    activeCategory: number;
    refreshing: boolean;
    hideHeader: boolean;
    hasMore: boolean;
    pagination: IPagination;
}

export interface CategoryModel extends Model {
    namespace: string;
    state: CategoryState;
    reducers: {
        setState: Reducer<CategoryState>;
    };
    effects: {
        fetchBookList: Effect;
    };
}

export interface CategoryType {
    namespace: string;
    state: CategoryState;
    reducers: {
        setState: Reducer<CategoryState>;
    };
    effects: {
        fetchBookList: Effect;
    };
}

const initialState = {
    bookList: [],
    statusList: [],
    loadDataList: [],
    activeStatus: 1,
    activeCategory: 0,
    refreshing: false,
    hideHeader: false,
    hasMore: false,
    pagination: {
        current_page: 0,
        page_size: 0,
        total: 0
    }
};

const categoryModel: CategoryModel = {
    namespace: "category",
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
        *fetchBookList(action, { call, put, select }) {
            const { payload, type } = action;
            const { refreshing } = payload;

            let { activeStatus, activeCategory, loadDataList } = yield select(
                (state: RootState) => state["category"]
            );

            const namespace = type.split("/")[0];

            if (refreshing) {
                if (loadDataList.indexOf(`tab-category-${activeCategory}-status-${activeStatus}`) > -1) {
                    return false;
                } else {
                    loadDataList.push(`tab-category-${activeCategory}-status-${activeStatus}`);
                    yield put({
                        type: "category/setState",
                        payload: {
                            loadDataList
                        }
                    });
                }
            }

            const { bookList: list, pagination } = yield select(
                (state: RootState) => state[namespace]
            );

            yield put({
                type: "setState",
                payload: {
                    refreshing
                }
            });

            const { data } = yield call(BookServices.getList, {
                page_size: 9,
                current_page: refreshing ? 1 : pagination.current_page + 1,
                "category_ids[]": activeCategory,
                status_id: activeStatus
            });

            const newList = refreshing ? data.list : [...list, ...data.list];

            yield put({
                type: "setState",
                payload: {
                    bookList: newList,
                    refreshing: false,
                    hasMore: data.pages.current_page * data.pages.page_size < data.pages.total,
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
    }
};

export default categoryModel;
