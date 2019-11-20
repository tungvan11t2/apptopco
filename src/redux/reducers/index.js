import { combineReducers } from 'redux';
import indexReducer from './indexReducer';
import appReducer from './appReducer';
import userReducer from './userReducer';
import flagInfoDetailReducer from './flagInfoDetailReducer';
const allReducers = combineReducers({
    indexReducer,
    appReducer,
    userReducer,
    flagInfoDetailReducer
})

export default allReducers;