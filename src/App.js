/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './redux/reducers';
import IndexContainer from './redux/containers/IndexContainer';

let store = createStore(allReducers);

const App = () => {
  return (
    <Provider store={store}>
        <IndexContainer />
    </Provider>
  );
};

export default App;
