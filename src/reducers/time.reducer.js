import {FETCH_TIMESHEET, FETCH_USER_DATA, FETCH_TIME_DATA, FETCH_USERS} from '../constants/time.constants';
const INITIAL_STATE = {all: [], user: null, data: [], allUsersInfo: []};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {...state, user: action.payload};
    case FETCH_TIMESHEET:
      return {...state, all: action.payload};
    case FETCH_TIME_DATA:
      return {...state, data: action.payload};
    case FETCH_USERS:
      console.log('time reduce', action.payload);
      return {...state, allUsersInfo: action.payload};
    default:
      return state;
  }
}
