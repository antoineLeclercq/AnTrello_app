var express = require('express');
var router = express.Router();
var path = require('path');
var storage = require(path.resolve(path.dirname(__dirname), 'modules/db/manipulations.js'));
var _ = require('underscore');

router.get('/', function(req, res, next) {
  storage.startingData(function (data) {
    res.render('index', { data: data });
  });
});

module.exports = router;
