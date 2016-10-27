import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './containers/app';
import DashboardIndex from './components/dashboardIndex';
import UserData from './components/userData';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import SubmitDashboard from './components/submitDashboard';
import Timesheet from './components/timesheet';
import DashboardTest from './components/dashboardTest';
import UserTest from './components/userTest';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DashboardIndex}/>
    <Route path="chart" component={DashboardTest}/>
    <Route path="test" component={UserTest}/>
    <Route path="user/:id" component={UserData}/>
    <Route path="signup" component={Signup}/>
    <Route path="signin" component={Signin}/>
    <Route path="signout" component={Signout}/>

    <Route path="timesheet/" component={SubmitDashboard}>
      <Route path="week/:id" component={Timesheet}/>
    </Route>
  </Route>
);
