import axios from 'axios';
import {FETCH_TIMESHEET, CREATE_TIMESHEET, FETCH_USER_DATA, ROOT_URL, FETCH_USERS, FETCH_TIME_DATA} from '../constants/time.constants';
import {parseJwt} from '../actions/auth.actions';
import {store} from '../index';

const userToken = localStorage.getItem('token');
const userInfo = parseJwt(userToken); // gets userID

// updated API endpoints
export function createTimesheet(props) {
  const request = axios.post(ROOT_URL, props);
  return {
    type: CREATE_TIMESHEET,
    payload: request
  };
}

// for fetching specific timesheet data by user and week
export function fetchTimehsheet(selectedWeek) {
  console.log('selectedWeek', selectedWeek);
  const request = axios.get(`${ROOT_URL}/${userInfo.sub}/${selectedWeek}`);

  request.then(({data}) => {
    console.log('action data', data);
    return store.dispatch({type: FETCH_TIME_DATA, payload: data});
  });
}

// fetching all of the available hours
export function fetchTimesheetData() {
  const request = axios.get(ROOT_URL);
  return dispatch => {
    request.then(({data}) => {
      dispatch({type: FETCH_TIMESHEET, payload: data});
    });
  };
}

// // fetching timesheet data by user
// export function fetchUserData(id) {
//   const request = axios.get(`${ROOT_URL}/user/${id}`);
//   return dispatch => {
//     request.then(({data}) => {
//       dispatch({type: FETCH_USER_DATA, payload: data});
//     });
//   };
// }

// fetching timesheet data by user
export function fetchUserData(id) {
  const request = axios.get(`http://localhost:3090/api/v2/test/${id}`);
  return dispatch => {
    request.then(({data}) => {
      dispatch({type: FETCH_USER_DATA, payload: data});
    });
  };
}

// fetch userData
export function fetchUsers() {
  const request = axios.get(`http://localhost:3090/api/v2/users`);

  request.then(({data}) => {
    console.log('fetchUsers', data);
    return store.dispatch({type: FETCH_USERS, payload: data});
  });
}

// fetching timesheet data by user
export function fetchAllData() {
  const request = axios.get(`http://localhost:3090/api/v2/test/`);
  return dispatch => {
    request.then(({data}) => {
      dispatch({type: FETCH_USER_DATA, payload: data});
    });
  };
}

export function convertToDate(string, addDays) {
  const year = string.substring(0, 4);
  const month = string.substring(4, 6);
  const day = Number(string.substring(6, 8));
  return new Date(year, month - 1, day + addDays);
}

export function convertToDateString(string) {
  const year = string.substring(0, 4);
  const month = string.substring(4, 6);
  const day = string.substring(6, 8);
  return month + '/' + day + '/' + year;
}
