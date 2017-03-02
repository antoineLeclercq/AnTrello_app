var express = require('express');
var router = express.Router();
var pg = require('pg');
var client = pg.Client({
  dbname: 'antrello_app',
});
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