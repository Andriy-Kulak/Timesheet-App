import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, ROOT_AUTH_URL} from '../constants/auth.constants';

export function signinUser({email, password}) {
  return function (dispatch) {
		// Submit email/password to the server
    axios.post(`${ROOT_AUTH_URL}signin`, {email, password})
    .then(response => {
      // If request is good...
      console.log('PASS');

      // - Update state to indicate user is authenticated: flag will turn to "true"
      dispatch({type: AUTH_USER});
      // - Save the JWT token in local storage
      localStorage.setItem('token', response.data.token);

      // - redirect to the route '/feature'
      browserHistory.push('/social');
    })
    .catch(() => {
					// if request is bad...
					// - Show an error to the user
      dispatch(authError('Bad Login Info!'));
    });
  };
}

	// TODOx: put all repetitive signup and signin code in here

export function signupUser({firstName, lastName, companyName, fbHandle, email, password}) {
  console.log('action signup inputs', firstName, lastName, companyName, fbHandle, email, password);
  return function (dispatch) {
		// Submit email/password to the server
    axios.post(`${ROOT_AUTH_URL}signup`, {firstName, lastName, companyName,
			fbHandle, email, password})
      .then(response => {
				// If request is good...
        console.log('PASS');

        // - Update state to indicate user is authenticated: flag will turn to "true"
        dispatch({type: AUTH_USER});
        // - Save the JWT token in local storage
        localStorage.setItem('token', response.data.token);

        // - redirect to the route '/feature'
        browserHistory.push('/');
      })
      .catch(() => {response => dispatch(authError(response.data.error));
        // if request is bad... Show an error to the user
        dispatch(authError('Bad Login Info!'));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

// testing to make sure we can make authenticated request to our auth backend
/*
export function fetchMessage() {
	return function(dispatch) {
		axios.get(ROOT_URL, {
			headers: {authorization: localStorage.getItem('token')}
		})
			.then(response => {
				console.log("TEST", response);
			});
	}
}*/

// importan rule: action creator alwasys returns an object (which is what we call an action) except when you use
// redux thunk - you can return another function
