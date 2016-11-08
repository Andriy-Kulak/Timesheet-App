const mongoose = require('mongoose');

let TimesheetSchema2 = new mongoose.Schema({
  dateWorked: Date,
  qa: Number,
  dev: Number,
  admin: Number,
  rd: Number,
  other: Number,
  dateCreated: Date,
  userInfo: {
    email: String,
    firstName: String,
    lastName: String,
    iat: String,
    sub: String
  }
});

//   date_submitted: Date.now
module.exports = mongoose.model('Timesheet', TimesheetSchema2);