var express = require('express');
var router = express.Router();
var path = require('path');
var storage = require(path.resolve(path.dirname(__dirname), 'modules/db/manipulations.js'));
var _ = require('underscore');

var validRoutesAndDBInfo = {
  lists: {
    table: 'list',
    colNames: ['name', 'position'],
  },
  cards: {
    table: 'card',
    colNames: ['list_id', 'name', 'description', 'due_date', 'position', 'subscriber'],
  },
  comments: 'comment',
  labels: 'label',
  activities: 'activity',
};

router.post('/:collection', function (req, res, err) {
  var collection = req.params.collection;
  var table = validRoutesAndDBInfo[collection].table;
  var inputs;
  var colNamesAndValues;

  if (!table) { throw 'Invalid Route'; }

  inputs = _.pick(req.body, validRoutesAndDBInfo[collection].colNames);
  colNamesAndValues = { names: _.keys(inputs), values: _.values(inputs) };

  storage.insert(table, colNamesAndValues, function (result) {
    res.send(result.rows[0]);
  });
});

module.exports = router;