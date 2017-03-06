var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore');
var storage = require(path.resolve(path.dirname(__dirname), 'modules/db/manipulations.js'));
var route_helpers = require(path.resolve(path.dirname(__dirname), 'modules/route_helpers.js'));

router.put('/:collection/:id', function (req, res, next) {
  var collection = req.params.collection;
  var id = req.params.id;
  var table = route_helpers.validRoutesAndDBInfo[collection].table;
  var colNames = route_helpers.validRoutesAndDBInfo[collection].colNames;
  var inputs;
  var colNamesAndValues;

  if (!table || _.isNumber(id)) { throw 'Invalid Route'; }

  inputs = _.pick(req.body, colNames);
  colNamesAndValues = { names: _.keys(inputs), values: _.values(inputs) };
  colNamesAndValues.id = id;

  storage.update(table, colNamesAndValues, function (result) {
    res.send(result.rows[0]);
  });
});

// router.post('/', function(req, res, next) {
//   storage.lists.insert(req.body, function (result) {
//     res.send(result.rows[0]);
//   });
// });

module.exports = router;
