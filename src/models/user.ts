import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import UserServices from "@/services/user";
import Toast from "react-native-root-toast";
import {StatusCode} from "@/utils/const";
import storage, {storageLoad} from "@/config/storage";



interface IUser {
    mobile: string;
    username: string;
    nickname: string;
}

export interface UserState {
    isLogin: boolean,
    userInfo: IUser,
}

interface UserModel extends Model {
    namespace: 'user';
    state: UserState;
    reducers: {
        userLogin: Reducer<UserState>;
        userLogout: Reducer<UserState>;
    };
    effects: {
        loadData: Effect;
        register: Effect;
        login: Effect;
        logout: Effect;
    };
    subscriptions: SubscriptionsMapObject;
}

const initialState = {
    isLogin: false,
    userInfo: {
        mobile: '',
        username: '',
        nickname: '',
    }
};

const userModel: UserModel = {
    namespace: 'user',
    state: initialState,
    reducers: {
        userLogin(state = initialState, {payload}) {
            return {
                ...state,
                ...payload,
                isLogin: true,
            };
        },
        userLogout(state = initialState, {payload}) {
            return {
                ...state,
                ...payload,
                isLogin: false,
            };
        },
    },
    effects: {
        *loadData(_, {call, put}) {
            const isLogin = yield call(storageLoad, {key: 'isLogin'});
            const userInfo = yield call(storageLoad, {key: 'userInfo'});
            if (isLogin) {
                yield put({
                    type: 'userLogin',
                    payload: {
                        userInfo
                    }
                })
            }
        },
        *register(action, {call, put}) {
            const {payload} = action;

            const data = yield call(UserServices.Register, payload);
            let isGoBack = false;

            Toast.show(data.msg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
            })

            if (data.code === StatusCode.SUCCESS) {
                isGoBack = true;
                const userInfo = {
                    mobile: data.data.mobile,
                    username: data.data.username,
                    nickname: data.data.nickname,
                }
                yield put({
                    type: 'userLogin',
                    payload: {
                        userInfo
                    }
                })

                storage.save({
                    key: 'isLogin',
                    data: true
                })
                storage.save({
                    key: 'token',
                    data: data.data.token
                })
                storage.save({
                    key: 'userInfo',
                    data: userInfo
                })
            }
            if (action.callback) {
                action.callback(isGoBack);
            }
        },
        *login(action, {call, put}) {
            const {payload} = action;

            const data = yield call(UserServices.Login, payload);
            let isGoBack = false;

            Toast.show(data.msg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
            })

            if (data.code === StatusCode.SUCCESS) {
                isGoBack = true;
                const userInfo = {
                    mobile: data.data.mobile,
                    username: data.data.username,
                    nickname: data.data.nickname,
                }
                yield put({
                    type: 'userLogin',
                    payload: {
                        userInfo
                    }
                })

                storage.save({
                    key: 'isLogin',
                    data: true
                })
                storage.save({
                    key: 'token',
                    data: data.data.token
                })
                storage.save({
                    key: 'userInfo',
                    data: userInfo
                })
            }
            if (action.callback) {
                action.callback(isGoBack);
            }
        },
        *logout(_, {call, put}) {
            const data = yield call(UserServices.logout);
            yield put({
                type: 'userLogout',
                payload: {
                    userInfo: initialState
                }
            })

            yield put({
                type: 'shelf/initData',
            })

            Toast.show(data.msg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
            })
            storage.remove({
                key: 'isLogin',
            })
            storage.remove({
                key: 'token',
            })
            storage.remove({
                key: 'userInfo',
            })
        },
    },
    subscriptions: {
        setup({dispatch}) {
            // dispatch({type: 'loadData'});
        },
        asyncStorage() {
            storage.sync.token = async () => {
                return null;
            };
            storage.sync.isLogin = async () => {
                return null;
            };
            storage.sync.userInfo = async () => {
                return null;
            };
        },
    },
};

export default userModel;
