import {FETCH_TIMESHEET, FETCH_USER_DATA, FETCH_TIME_DATA} from '../constants/time.constants';
const INITIAL_STATE = {all: [], user: null, data: []};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {...state, user: action.payload};
    case FETCH_TIMESHEET:
      return {...state, all: action.payload};
    case FETCH_TIME_DATA:
      console.log('action.payload', action.payload);
      return {...state, data: action.payload};
    default:
      return state;
  }
}
