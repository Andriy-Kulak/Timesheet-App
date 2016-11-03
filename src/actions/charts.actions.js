import axios from 'axios';
import {FETCH_TIMESHEET, FETCH_USER_DATA, ROOT_URL, FETCH_USERS} from '../constants/time.constants';
import {store} from '../index';

// fetching all of the available hours
export function fetchTimesheetData() {
  const request = axios.get(ROOT_URL);
  return dispatch => {
    request.then(({data}) => {
      dispatch({type: FETCH_TIMESHEET, payload: data});
    });
  };
}

// fetching timesheet data by user
export function fetchUserData(id) {
  // if request is for all users, then return all users
  if (id === 'all') {
    const request = axios.get(`http://localhost:3090/api/v2/test`);
    return dispatch => {
      request.then(({data}) => {
        dispatch({type: FETCH_USER_DATA, payload: data});
      });
    };
  }

  const request = axios.get(`http://localhost:3090/api/v2/test/${id}`);
  return dispatch => {
    request.then(({data}) => {
      dispatch({type: FETCH_USER_DATA, payload: data});
    });
  };
}

// fetch all available users
export function fetchUsers() {
  const request = axios.get(`http://localhost:3090/api/v2/users`);

  request.then(({data}) => {
    console.log('fetchUsers', data);
    return store.dispatch({type: FETCH_USERS, payload: data});
  });
}
