var express = require('express');
var router = express.Router();
var pg = require('pg');
var client = pg.Client({
  dbname: 'antrello_app',
});

router.post('/new/list', function (req, res, err) {

});

module.exports = router;