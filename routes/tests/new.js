var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore');
var storageTest = require(path.resolve(path.dirname(__dirname), '../modules/tests/db_manipulations.js'));
var authorizedRoutesAndTables = {
  lists: 'list',
  cards: 'card',
  comments: 'comment',
  labels: 'label',
  activities: 'activity',
};

router.post('/:collection/new', function (req, res, err) {
  var collection = req.params.collection;
  var table = authorizedRoutesAndTables[collection];
  var inputs;
  var options;

  if (!table) { throw 'Invalid Route'; }

  inputs = JSON.parse(JSON.stringify(req.body));
  options = { names: _.keys(inputs), values: _.values(inputs) };

  storageTest.addRowToTable(table, options, function (result) {
    res.send(result.rows[0]);
  });
});

module.exports = router;