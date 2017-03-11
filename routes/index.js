var express = require('express');
var router = express.Router();
var path = require('path');
var storage = require(path.resolve(path.dirname(__dirname), 'modules/db/manipulations.js'));
var _ = require('underscore');
var route_helpers = require(path.resolve(path.dirname(__dirname), 'modules/route_helpers.js'));

router.get('/', function(req, res, next) {
  storage.startingData(function (data) {
    res.render('index', { data: data });
    console.log(data.cards);
  });
});

router.get('/card/:id', function(req, res, next) {
  var id = Number(req.params.id);

  storage.startingData(function (data) {
    if (route_helpers.isValidCardId(id, data.cards)) {
      res.render('index', { data: data });
    } else {
      next(new Error('This card does not exist'));
    }
  });
});

module.exports = router;
