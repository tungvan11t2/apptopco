import { STORE_FLAG_DETAIL } from '../actions/actionTypes';

const flagInfoDetailReducer = (flag = 0, action) => {
    switch (action.type) {
        case STORE_FLAG_DETAIL: 
            return action.flag;
        default: 
            return flag;
    }
}

export default flagInfoDetailReducer;