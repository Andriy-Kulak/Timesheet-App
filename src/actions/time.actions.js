import axios from 'axios';
import {FETCH_TIMESHEET, CREATE_TIMESHEET, FETCH_USER_DATA, DELETE_TIMESHEET, ROOT_URL, FETCH_TIME_DATA} from '../constants/time.constants';
import {parseJwt} from '../actions/auth.actions';
import {store} from '../index';

// Old API endpoint
export function fetchTimesheetData() {
  const request = axios.get(ROOT_URL);
  return dispatch => {
    request.then(({data}) => {
      dispatch({type: FETCH_TIMESHEET, payload: data});
    });
  };
}

// Old api endpoint
// export function createTimesheet(props) {
//   console.log('create action hit after', props);
//   const userToken = localStorage.getItem('token');
//   const userInfo = parseJwt(userToken);

//   props.userInfo = userInfo;

//   const request = axios.post(ROOT_URL, props);
//   console.log('create action hit after', props);
//   return {
//     type: CREATE_TIMESHEET,
//     payload: request
//   };
// }

// updated API endpoints
export function createTimesheet(props) {
  const request = axios.post('http://127.0.0.1:3090/api/v1/test/timesheet/', props);
  return {
    type: CREATE_TIMESHEET,
    payload: request
  };
}

// NEW  API endpooint
export function fetchTimehsheet(selectedWeek) {
  console.log('pass');
  const userToken = localStorage.getItem('token');
  const userInfo = parseJwt(userToken);
  console.log('test', userInfo.sub);

  console.log('selectedWeek', selectedWeek);
  const request = axios.get(`http://127.0.0.1:3090/api/v1/test/timesheet/${userInfo.sub}/${selectedWeek}`);

  request.then(({data}) => {
    console.log('action data', data);
    return store.dispatch({type: FETCH_TIME_DATA, payload: data});
  });
}

export function fetchUserData(id) {
  const request = axios.get(`${ROOT_URL}${id}`);
  return dispatch => {
    request.then(({data}) => {
      dispatch({type: FETCH_USER_DATA, payload: data});
    });
  };
}

// not being used for now
export function deleteTime(id) {
  const request = axios.delete(`${ROOT_URL}${id}`);

  return {
    type: DELETE_TIMESHEET,
    payload: request
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
