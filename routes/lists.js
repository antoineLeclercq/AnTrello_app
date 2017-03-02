var express = require('express');
var router = express.Router();
var path = require('path');
var storage = require(path.resolve(path.dirname(__dirname), 'modules/db/manipulations.js'));
var _ = require('underscore');

router.get('/', function (req, res, next) {
  storage.lists.all(function (result) {
    res.send(result.rows);
  });
});

router.post('/', function(req, res, next) {
  storage.lists.insert(req.body, function (result) {
    console.log(result.rows[0].id);
    res.send(result.rows[0]);
  });
});

module.exports = router;
