import {combineReducers} from 'redux';
import TimesheetReducer from './time.reducer';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth.reducer';

const rootReducer = combineReducers({
  sheets: TimesheetReducer,
  form: formReducer,
  auth: authReducer
});

export default rootReducer;
