import axios from 'axios';
import {FETCH_TIMESHEET, CREATE_TIMESHEET, FETCH_USER_DATA, DELETE_TIMESHEET, ROOT_URL} from '../constants/time.constants';
import {parseJwt} from '../actions/auth.actions';

export function fetchTimesheetData() {
  const request = axios.get(ROOT_URL);
  return dispatch => {
    request.then(({data}) => {
      dispatch({type: FETCH_TIMESHEET, payload: data});
    });
  };
}

export function createTimesheet(props) {
  const userToken = localStorage.getItem('token');
  let userInfo;
  if (userToken) {
    userInfo = parseJwt(userToken);
  }
  props.userInfo = userInfo;
  console.log('create action hit beofre ', props);

  const request = axios.post(ROOT_URL, props);
  console.log('create action hit after', props);
  return {
    type: CREATE_TIMESHEET,
    payload: request
  };
}

export function fetchUserData(name) {
  const request = axios.get(`${ROOT_URL}${name}`);
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
