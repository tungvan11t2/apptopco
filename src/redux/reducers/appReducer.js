import { APP_TITLE } from '../actions/actionTypes';

const appReducer = (title = 'Home', action) => {
    switch (action.type) {
        case APP_TITLE: 
            return action.user;
        default: 
            return title;
    }
}

export default appReducer;