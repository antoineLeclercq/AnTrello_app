var path = require('path');
var queries = require(path.resolve(path.dirname(__dirname), 'db/queries.js'));
var _ = require ('underscore');
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
  delete: function (table, opts, task) {
    this.query({
      query: 'DELETE FROM ' + table + ' WHERE id = $1;',
      options: opts,
    }, task);
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
  update: function (table, options, task) {
    var names = options.names.join(', ');
    var values = options.values.map(function (val, i) {
      return '$' + (i + 1);
    }).join(', ');
    var query = 'UPDATE ' + table + ' SET (' + names + ')' + ' = (' + values + ') WHERE id = ' + options.id + ';';

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
      query: queries.allLists,
    }, task);
  },
  insert: function (options, task) {
    storage.query({
      query: queries.insertList,
      options: [options.name, options.position],
    }, task);
  },
  formatListsResult: function (rows) {
    return _.each(this.formatCardsResult(rows), function (row) {
      row.cards = row.cards.filter(function (card) {
        return card.id;
      });

      return row;
    });
  },
  formatCardsResult: function (rows) {
    return _.values(rows.reduce(function (result, row) {
      var formatedRow = result[row.id] || {};
      var card = {};

      _.each(row, function (v, k) {
          var match = k.match(/^card_(.+)$/);

          if (match) {
            card[match.pop()] = v;
          } else {
            formatedRow[k] = v;
          }
      });

      formatedRow.cards = formatedRow.cards ? formatedRow.cards.concat(card) : [card];
      result[formatedRow.id] = formatedRow;

      return result;
    }, {}));
  },
};

var cards = {
  all: function (task) {
    storage.query({
      query: queries.allCards,
    }, task);
  },
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
    data.lists = self.lists.formatListsResult(result.rows);
    task(data);
  });
};

module.exports = storage;
