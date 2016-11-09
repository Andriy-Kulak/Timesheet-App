const passport = require('passport');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const mongoose = require('mongoose');
const TimeController = require('./controllers/timesheet');
const ChartController = require('./controllers/charts');

// by default, passport tries to provide a session cookie, so we are setting it to false
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false}); 

module.exports = function (app) {
	// auth API endpoints
  app.get('/', requireAuth, function (req, res) {
    res.send({message: 'Super secret code is ABC123'});
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  // updated API endpoints
  app.get('/api/v2/chart', ChartController.getAllAverage);
  app.get('/api/v2/chart/:id', ChartController.getChartByUser);
  app.get('/api/v2/users', TimeController.getUsers);
  app.get('/api/v2/timesheet', TimeController.getAllTimeData);
  app.post('/api/v2/timesheet', TimeController.postTime);
  app.get('/api/v2/timesheet/user/:id', TimeController.getTimeByUser);
  app.get('/api/v2/timesheet/:id/:week', TimeController.getTime);
}