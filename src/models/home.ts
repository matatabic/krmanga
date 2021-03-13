import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import BookServices from "@/services/book";
import {RootState} from "@/models/index";

export interface IPagination {
    current_page: number;
    page_size: number;
    total: number;
}

export interface IBook {
    id: number;
    title: string;
    image: string;
    category: string;
}

export interface ICarousel {
    id: number;
    image_url: string;
}

export interface ICommendList {
    title: string;
    data: IBook[][];
}

export interface HomeState {
    carouselList: ICarousel[];
    activeCarouselIndex: number;
    commendList: ICommendList[];
    refreshing: boolean,
    hasMore: boolean,
    pagination: IPagination;
}

interface HomeModel extends Model {
    namespace: 'home';
    state: HomeState;
    reducers: {
        setState: Reducer<HomeState>;
    };
    effects: {
        fetchCarouselList: Effect;
        fetchCommendList: Effect;
    };
}

const initialState = {
    carouselList: [],
    activeCarouselIndex: 0,
    commendList: [],
    refreshing: false,
    hasMore: false,
    pagination: {
        current_page: 0,
        page_size: 0,
        total: 0,
    }
};

const homeModel: HomeModel = {
    namespace: 'home',
    state: initialState,
    reducers: {
        setState(state = initialState, {payload}) {
            return {
                ...state,
                ...payload,
            };
        },
    },
    effects: {
        *fetchCarouselList(_, {call, put}) {
            const {data} = yield call(BookServices.getCarousel);
            yield put({
                type: 'setState',
                payload: {
                    carouselList: data.data,
                },
            });
        },
        *fetchCommendList(action, {call, put, select}) {
            const {payload, type} = action;
            const {refreshing} = payload;
            const {commendList: list, pagination} = yield select(
                (state: RootState) => state['home'],
            );

            yield put({
                type: 'setState',
                payload: {
                    refreshing
                },
            });

            const {data} = yield call(BookServices.getCommend, {
                page_size: 2,
                current_page: refreshing ? 1 : pagination.current_page + 1
            });

            const newList = refreshing ? data.list : [...list, ...data.list];

            yield put({
                type: 'setState',
                payload: {
                    commendList: newList,
                    refreshing: false,
                    hasMore: data.pages.current_page * data.pages.page_size < data.pages.total,
                    pagination: {
                        current_page: data.pages.current_page,
                        page_size: data.pages.page_size,
                        total: data.pages.total,
                    },
                }
            });

            if (action.callback) {
                action.callback();
            }
        },
    },
};

export default homeModel;
