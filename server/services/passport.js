const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config');
const LocalStrategy = require('passport-local');

// Create a local strategy
const localLogin = new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
// verify this username and password when Signing In, call done with the user
// if it is the correct email and password
// otherwise, call done with false
  User.findOne({email: email}, function (err, user) {
    if (err) {
      return done(err);
    } // if error
    if (!user) {
      return done(null, false);
    } // if user not found

    // compare passwords - is `password` = password.user?
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// see if the user ID in the payload exists in our database
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }
		// if it does, call 'done' with that user
    if (user) {
      done(null, user); // if user found and user found
    // otherwise, call done without a user object
    } else {
      done(null, false); // if search is done and no user found
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
