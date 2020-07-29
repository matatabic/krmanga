import { Model, Effect } from 'dva-core-ts';
import { Reducer } from 'redux';

export interface HomeState {
    num:number;
}

const action = {
    type:'add',
}

interface HomeModel extends Model {
    namespace: 'home';
    state: HomeState;
    reducers: {
       add: Reducer<HomeState>
    };
    effects: {
        asyncAdd :Effect;
    };
}

const initealState = {
    num:0,
};

function delay(timeout:number){
    return new Promise(resolve=>{
        setTimeout(resolve,timeout);
    })
}

const homeModel:HomeModel= {
    namespace:'home',
    state:initealState,
    reducers:{
        add(state = initealState,{payload}){
            return{
                ...state,
                num:state.num + payload.num,
            }
        }
    },
    effects:{
        *asyncAdd({payload},{call,put}){
            yield call(delay,3000);
            yield put({
                type:'add',
                payload
            })
        }
    }
}

export default homeModel;