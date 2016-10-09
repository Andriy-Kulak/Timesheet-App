import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './containers/app';
import DashboardIndex from './components/dashboardIndex';
import NewTimesheet from './components/newTimesheet';
import UserData from './components/userData';
import SignUp from './components/signup';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DashboardIndex}/>
    <Route path="timesheet/new" component={NewTimesheet}/>
    <Route path="user/:name" component={UserData}/>
    <Route path="signup" component={SignUp}/>
  </Route>
);
