import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './containers/app';
import DashboardIndex from './components/dashboardIndex';
import NewTimesheet from './components/newTimesheet';
import UserData from './components/userData';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';

import NewTimesheet2 from './components/newTimesheet2';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DashboardIndex}/>
    <Route path="timesheet/new" component={NewTimesheet}/>
    <Route path="user/:id" component={UserData}/>
    <Route path="signup" component={Signup}/>
    <Route path="signin" component={Signin}/>
    <Route path="signout" component={Signout}/>

    <Route path="timesheet/test" component={NewTimesheet2}/>
  </Route>
);
