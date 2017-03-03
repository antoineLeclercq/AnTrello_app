var express = require('express');
var router = express.Router();
var path = require('path');
var storage = require(path.resolve(path.dirname(__dirname), 'modules/db/manipulations.js'));
var _ = require('underscore');

router.post('/', function(req, res, next) {
  storage.cards.insert(req.body, function (result) {
    res.send(result.rows[0]);
  });
});

module.exports = router;
