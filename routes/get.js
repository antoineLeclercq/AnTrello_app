var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore');
var storage = require(path.resolve(path.dirname(__dirname), 'modules/db/manipulations.js'));
var route_helpers = require(path.resolve(path.dirname(__dirname), 'modules/route_helpers.js'));

router.get('/:collection', function (req, res, next) {
  var collection = req.params.collection;
  var table = route_helpers.validRoutesAndDBInfo[collection].table;

  if (!table) { throw 'Invalid Route'; }

  storage[collection].all(function (result) {
    res.send(result.rows);
  });
});

module.exports = router;