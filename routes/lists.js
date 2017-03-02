var express = require('express');
var router = express.Router();
var path = require('path');
var storage = require(path.resolve(path.dirname(__dirname), 'modules/db_manipulations.js'));
var _ = require('underscore');

router.get('/', function (req, res, next) {
  storage.lists.all(function (result) {
    res.send(result.rows);
  });
});

router.post('/new', function(req, res, next) {
  res.render('index');
});

module.exports = router;
