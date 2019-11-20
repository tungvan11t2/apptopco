import { STORE_USER } from '../actions/actionTypes';

const userReducer = (user = null, action) => {
    switch (action.type) {
        case STORE_USER: 
            return action.user;
        default: 
            return user;
    }
}

export default userReducer;