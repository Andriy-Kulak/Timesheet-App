import {FETCH_TIMESHEET, FETCH_USER_DATA} from '../constants/time';
const INITIAL_STATE = {all: [], user: null};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {...state, user: action.payload.data};
    case FETCH_TIMESHEET:
      return {...state, all: action.payload.data};
    default:
      return state;
  }
}
