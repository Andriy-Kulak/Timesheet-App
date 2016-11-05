import axios from 'axios';
import {FETCH_TIMESHEET, CREATE_TIMESHEET, ROOT_URL, FETCH_TIME_DATA} from '../constants/time.constants';
import {store} from '../index';
import {SubmissionError} from 'redux-form';

// Posting Timesheet Data
export function createTimesheet(props) {
  const request = axios.post(ROOT_URL, props);
  console.log('action pass', props);
  return ({
    type: CREATE_TIMESHEET,
    payload: request
  });
}

// Fetching specific timesheet data by user and week
export function fetchTimehsheet(selectedWeek, userInfo) {
  console.log('selectedWeek', selectedWeek);
  console.log('selectedUser fetch TimeSheet', userInfo);
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
