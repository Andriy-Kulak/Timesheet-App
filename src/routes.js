import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './containers/app';
import DashboardIndex from './components/dashboardIndex';
import UserData from './components/userData';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import SubmitDashboard from './components/timesheets/submitDashboard';
import Timesheet from './components/timesheets/timesheet';
import DashboardTest from './components/dashboardTest';
import UserSelect from './components/mainDashboard/userSelect';
import ChartUi from './components/mainDashboard/chartUi';
import UserTable from './components/userChart/userTable';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DashboardIndex}/>

    <Route path="signup" component={Signup}/>
    <Route path="signin" component={Signin}/>
    <Route path="signout" component={Signout}/>

    <Route path="chart/" component={UserSelect}>
      <Route path=":id" component={ChartUi}/>
    </Route>

    <Route path="user/:id" component={UserTable}/>

    <Route path="timesheet/" component={SubmitDashboard}>
      <Route path="week/:id" component={Timesheet}/>
    </Route>
  </Route>
);

// <Route path="chart" component={DashboardTest}/>
// <Route path="user/:id" component={UserData}/>