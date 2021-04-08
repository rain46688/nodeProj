import { combineReducers } from 'redux';
//아직 안만들은건 주석처리하고 나중에 풀기
// 여러가지 기능에 따라 reducer가 생성될수있어서 combineReducers를 이용해서 rootReducer로 하나로 묶어주는 역할을 한다.
import user from './user_reducer';

const rootReducer = combineReducers({
    //기능이 많아지면 늘어나게된다.
    user
})

export default rootReducer;