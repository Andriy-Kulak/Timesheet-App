import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, ROOT_AUTH_URL} from '../constants/auth.constants';
import {store} from '../index';

export function signinUser(email, password) {
  console.log('email and password in action2', email, password);
  const request = axios.post(`${ROOT_AUTH_URL}signin`, {email, password});
  console.log('request', request);

		// Submit email/password to the server
  request.then(response => {
    console.log('response', response);
    // - Update state to indicate user is authenticated: flag will turn to "true"
    // - Save the JWT token in local storage
    localStorage.setItem('token', response.data.token);

    // - redirect to the route '/feature'
    browserHistory.push('/');
    // return {type: AUTH_USER};
    return store.dispatch({type: AUTH_USER});
  }, err => {
    console.log('error', err);
    return (authError('Bad Login Info!'));
  })
  .catch(() => {
        // if request is bad...
        // - Show an error to the user
    return (authError('Bad Login Info!'));
  }
  );
}

export function signupUser({firstName, lastName, email, password}) {
  // Submit email/password to the server
  console.log('get to action', firstName, lastName, email, password);
  axios.post(`${ROOT_AUTH_URL}signup`, {firstName, lastName, email, password})
    .then(response => {
      // If request is good...
      console.log('PASS');

      // - Update state to indicate user is authenticated: flag will turn to "true"

      // - Save the JWT token in local storage
      localStorage.setItem('token', response.data.token);

      // - redirect to the route '/feature'
      browserHistory.push('/');
      return store.dispatch({type: AUTH_USER});
    }, err => {
      console.log('error', err);
      return (authError(err.data.error));
    })
    .catch(() => {
      response => {
        console.log('response', response);
        return (authError(response.data.error));
      // if request is bad... Show an error to the user
      };
    });
}

export function authError(error) {
  return store.dispatch({
    type: AUTH_ERROR,
    payload: error
  });
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

export function parseJwt(token) {
  if (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  return {};
}
