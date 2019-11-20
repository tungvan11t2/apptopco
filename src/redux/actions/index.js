import { 
    INCREMENT, 
    DECREMENT,
    APP_TITLE,
    STORE_USER,
    STORE_FLAG_DETAIL
} from './actionTypes';

export const increaseAction = (step) => {
    return {
        type: INCREMENT,
        step: step
    }
}

export const decreaseAction = (step) => {
    return {
        type: DECREMENT,
        step: step
    }
}

export const changeTitleAction = (title) => {
    return {
        type: APP_TITLE,
        title: title
    }
}

export const changeUserAction = (user) => {
    return {
        type: STORE_USER,
        user: user
    }
}

export const changeFlagInfoDetailAction = (flag) => {
    return {
        type: STORE_FLAG_DETAIL,
        flag: flag
    }
}