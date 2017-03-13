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
    var query;

    if (table === 'card_label') {
      query = 'DELETE FROM ' + table + ' WHERE card_id = $1 AND label_id = $2;';
    } else {
      query = 'DELETE FROM ' + table + ' WHERE id = $1;';
    }

    this.query({
      query: query,
      options: opts,
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
  }
};

var cards = {
  all: function (task) {
    storage.query({
      query: queries.allCards,
    }, task);
  },
};

var comments = {
  all: function (task) {
    storage.query({
      query: queries.allComments,
    }, task);
  },
};

var labels = {
  all: function (task) {
    storage.query({
      query: queries.allLabelsAndCardIds,
    }, task);
  },
};

var activities = {
  all: function (task) {
    storage.query({
      query: queries.allActivities,
    }, task);
  },
};

storage.lists = lists;
storage.cards = cards;
storage.comments = comments;
storage.labels = labels;
storage.activities = activities;

storage.startingData = function (task) {
  var data = {};

  storage.lists.all(function (listsData) {
    data.lists = listsData.rows;
    storage.cards.all(function (cardsData) {
      data.cards = cardsData.rows;
      storage.labels.all(function (labelsData) {
        data.labels = labelsData.rows;

        data.labels = data.labels.map(function (label) {
          label.card_ids = label.card_ids.filter(function (id) { return id; });
          return label;
        });

        storage.comments.all(function (commentsData) {
          data.comments = commentsData.rows;
          storage.activities.all(function (activitiesData) {
            data.activities = activitiesData.rows;
            task(data);
          });
        });
      });
    });
  });
};

module.exports = storage;
