import axios from 'axios';
import {FETCH_TIMESHEET, CREATE_TIMESHEET, FETCH_USER_DATA, DELETE_TIMESHEET, ROOT_URL} from '../constants/time.constants';
import {parseJwt} from '../actions/auth.actions';
import _ from 'lodash';

export function fetchTimesheetData() {
  const request = axios.get(ROOT_URL);
  return dispatch => {
    request.then(({data}) => {
      dispatch({type: FETCH_TIMESHEET, payload: data});
    });
  };
}

export function createTimesheet(props) {
  console.log('create action hit after', props);
  const userToken = localStorage.getItem('token');
  const userInfo = parseJwt(userToken);

  props.userInfo = userInfo;

  const request = axios.post(ROOT_URL, props);
  console.log('create action hit after', props);
  return {
    type: CREATE_TIMESHEET,
    payload: request
  };
}

export function createTimesheet2(props) {
  // let submitArray = [];
  // for (let i = 0; i <= 6; i++) {
  //   submitArray.push({dateWorked: props.pickedWeek, dev: props.monDev })
  // }

  // emample = {userInfo: object, dateWorked: date, programming: 6, QA: 2, other: 0}

  // const a = {
  //   name: 'Foo',
  //   amount: 55,
  // //   reported: false,
  // //   date: '10/01/2001'
  // // };

  // const map = {
  //   monDev: 'dev',
  //   tueDev: 'dev',
  //   wedDev: 'dev',
  //   thurDev: 'dev',
  //   friDev: 'dev',
  //   satDev: 'dev',
  //   sunDev: 'dev'
  // };
  // console.log('props', props)

  // let testArray = [];
  // _.forEach(props, (value, key) => {
  //     testArray.push(value);
  // });
  // console.log(testArray);
  // let testArrayFinal = [];
  // let b = {};
  // for (let i = 0; i < testArray.length; i++) {
  //   _.each(testArray[i], (value, key) => {
  //     key = map[key] || key;
  //     b[key] = value;
  //   }, {});
  //   testArrayFinal.push(b);
  // }
  console.log('testArrayFinal',testArrayFinal);
  const userToken = localStorage.getItem('token');
  const userInfo = parseJwt(userToken);
  props.userInfo = userInfo;
  console.log('create action hit after', props);

  // const request = axios.post(ROOT_URL, props);
  // return {
  //   type: CREATE_TIMESHEET,
  //   payload: request
  // };
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
