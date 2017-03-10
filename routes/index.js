var express = require('express');
var router = express.Router();
var path = require('path');
var storage = require(path.resolve(path.dirname(__dirname), 'modules/db/manipulations.js'));
var _ = require('underscore');
var route_helpers = require(path.resolve(path.dirname(__dirname), 'modules/route_helpers.js'));

router.get('/', function(req, res, next) {
  var data = {};

  storage.lists.all(function (listsData) {
    data.lists = listsData.rows;
    storage.cards.all(function (cardsData) {
      data.cards = cardsData.rows;
      res.render('index', { data: data });
    });
  });
});

router.get('/card/:id', function(req, res, next) {
  var data = {};
  var id = Number(req.params.id);

  storage.lists.all(function (listsData) {
    data.lists = listsData.rows;
    storage.cards.all(function (cardsData) {
      if (route_helpers.isValidCardId(id, cardsData.rows)) {
        data.cards = cardsData.rows;
        res.render('index', { data: data });
      } else {
        next(new Error('This card does not exist'));
      }
    });
  });
});

module.exports = router;
