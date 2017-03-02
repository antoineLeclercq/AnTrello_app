var pg = require('pg');
var client = new pg.Client('pg://localhost:5432/antrello_app');
client.connect();

var storage = {
  log: function (queryAndOptions) {
    console.log('query: ', queryAndOptions.query);
    console.log('params: ', queryAndOptions.options);
    console.log('----------------------------------------------------------');

  },
  query: function (queryAndOptions, task) {
    client.query(queryAndOptions.query, queryAndOptions.options, function (err, result) {
      if (err) { throw err; }
      if (task) { task(result); }
    });
    this.log(queryAndOptions);
  },
  delete: function (table, opts) {
    this.query({
      query: 'DELETE FROM ' + table + ' WHERE id = $1;',
      options: opts,
    });
  },
  select: function (table, id, task) {
    this.query({
      query: 'SELECT * FROM ' + table + ' WHERE id = $1;',
      options: [id],
    }, task);
  },
  insert: function (table, options, task) {
    var names = options.names.join(', ');
    var values = options.values.map(function (val, i) {
      return '$' + (i + 1);
    }).join(', ');
    var query = 'INSERT INTO '+ table + '(' + names + ')' + ' VALUES (' + values + ') RETURNING id;';

    this.query({
      query: query,
      options: options.values,
    }, task);
  },
  disconnect: client.end,
};

var lists = {
  all: function (task) {
    storage.query({
      query: 'SELECT * FROM list;',
    }, task);
  },
};

var cards = {

};

var comments = {

};

var labels = {

};

var activities = {

};

storage.lists = lists;
storage.cards = cards;
storage.comments = comments;
storage.labels = labels;
storage.activities = activities;

storage.startingData = function (task) {
  var self = this;
  var data = {};

  this.lists.all(function (result) {
    data.lists = result.rows;

    task(data);
  });
}


module.exports = storage;
