import {FETCH_TIMESHEET, FETCH_USER_DATA, FETCH_TEST} from '../constants/time.constants';
const INITIAL_STATE = {all: [], user: null, test: []};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {...state, user: action.payload.data};
    case FETCH_TIMESHEET:
      return {...state, all: action.payload.data};
    case FETCH_TEST:
      console.log('Reducer TEST', action);
      return {...state, test: action.payload};
    default:
      return state;
  }
}
