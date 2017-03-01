var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore');
var storageTest = require(path.resolve(path.dirname(__dirname), '../modules/db_manipulations.js'))(true);
var authorizedRoutes = ['list', 'card', 'comment', 'label', 'activity', 'notification'];

router.post('/new/:table', function (req, res, err) {
  var table = req.params.table;
  var inputs;
  var options;

  if (!_.includes(authorizedRoutes, table)) { throw 'Invalid Route'; }

  inputs = JSON.parse(JSON.stringify(req.body));
  options = { names: _.keys(inputs), values: _.values(inputs) };

  storageTest.addRowToTable(table, options, function (result) {
    res.send(result.rows[0]);
  });
});

module.exports = router;