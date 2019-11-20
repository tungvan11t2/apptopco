/* Redux */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import OneSignal from 'react-native-onesignal';

import { 
    increaseAction, 
    decreaseAction,
    changeScreenTitle,
    changeUserAction,
    changeFlagInfoDetailAction
} from '../actions';

/* App Container */
import AppContainer from './AppContainer';

class IndexNavigation extends Component {
    constructor(props) {
        super(props);
        // OneSignal.init("");

        // OneSignal.addEventListener('received', this.onReceived);
        // OneSignal.addEventListener('opened', this.onOpened);
        // OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        // OneSignal.removeEventListener('received', this.onReceived);
        // OneSignal.removeEventListener('opened', this.onOpened);
        // OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        // console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        // console.log('Message: ', openResult.notification.payload.body);
        // console.log('Data: ', openResult.notification.payload.additionalData);
        // console.log('isActive: ', openResult.notification.isAppInFocus);
        // console.log('openResult: ', openResult);
    }

    onIds(device) {
        // console.log('Device info: ', device);
    }
    
    render() {
        return <AppContainer screenProps={this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        times: state.indexReducer ? state.indexReducer : 0,
        appTitle: state.appReducer ? state.appReducer : '',
        userData: state.userReducer ? state.userReducer : null,
        flagDetail: state.flagInfoDetailReducer ? state.flagInfoDetailReducer : 0,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onIncrement: (step) => {
            dispatch(increaseAction(step));
        },
        onDecrement: (step) => {
            dispatch(decreaseAction(step));
        },
        onChangeTitle: (title) => {
            dispatch(changeScreenTitle(title));
        },
        onAddUserToStore: (user) => {
            dispatch(changeUserAction(user));
        },
        onChangeFlagInfoDetailToStore: (flagInfoDetail) => {
            dispatch(changeFlagInfoDetailAction(flagInfoDetail));
        },
    }
};

const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(IndexNavigation);
export default IndexContainer;