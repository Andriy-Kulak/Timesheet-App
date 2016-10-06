import {combineReducers} from 'redux';
import TimesheetReducer from './reducerTimesheet';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  sheets: TimesheetReducer,
  form: formReducer
});

export default rootReducer;
