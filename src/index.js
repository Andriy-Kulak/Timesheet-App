import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, browserHistory} from 'react-router';
import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise';
import {AUTH_USER} from './constants/auth.constants';

const token = localStorage.getItem('token');
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers);
// If we have a token, consider the user to be logged in
if (token) {
  // we need to update application status
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
  , document.querySelector('.container'));
