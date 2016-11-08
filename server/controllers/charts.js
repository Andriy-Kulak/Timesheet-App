const Timesheet = require('../models/timesheet');

exports.getChartByUser = function (req, res, next) {
  Timesheet.aggregate([
    {$match: {
      'userInfo.sub': req.params.id
    }
    },
    {$project: {
      dateWorkedmin: '$dateWorked',
      dateWorked: {$subtract: ['$dateWorked', 24 * 60 * 60 * 1000]},
      dev: '$dev',
      qa: '$qa',
      admin: '$admin',
      other: '$other',
      rd: '$rd'
    }
    },
      {$group: {
        _id: {$week: '$dateWorked'},
        weekOf: {$min: '$dateWorkedmin'},
        docCount: {$sum: 1},
        dev: {$sum: '$dev'},
        qa: {$sum: '$qa'},
        admin: {$sum: '$admin'},
        other: {$sum: '$other'},
        rd: {$sum: '$rd'},
        total: {$sum: {$add: ['$rd', '$other', '$admin', '$qa', '$dev']}}
        }
      },
      {"$sort": {weekOf: 1}}
  ], function (err, data) {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
};

exports.getAllAverage = function (req, res, next) {
  Timesheet.aggregate([
    {$project: {
      dateWorkedmin: '$dateWorked',
      dateWorked: {$subtract: ['$dateWorked', 24 * 60 * 60 * 1000]},
      dev: '$dev',
      qa: '$qa',
      admin: '$admin',
      other: '$other',
      rd: '$rd'
    }
    },
    {$group: {
      _id: {
        day: {$dayOfYear: '$dateWorked'},
        week: {$week: '$dateWorked'},
        year: {$year: '$dateWorked'}
      },
      dayWorked: {$first: '$dateWorked'},
      dev: {$avg: '$dev'},
      qa: {$avg: '$qa'},
      admin: {$avg: '$admin'},
      other: {$avg: '$other'},
      rd: {$avg: '$rd'}
    }
    },
    {$group: {
      _id: {
        week: {$week: '$dayWorked'},
        year: { $year: '$dayWorked'}},
      weekOf: {$min: {$add: ['$dayWorked', 24 * 60 * 60 * 1000]}},
      docCount: {$sum: 1},
      dev: {$sum: '$dev'},
      qa: {$sum: '$qa'},
      admin: {$sum: '$admin'},
      other: {$sum: '$other'},
      rd: {$sum: '$rd'},
      total: {$sum: {$add: ['$rd', '$other', '$admin', '$qa', '$dev']}}
      }
    },
    {"$sort": {weekOf: 1}}
  ], function(err, data) {
        if (err) return next(err);
        res.json(data);
      });
}