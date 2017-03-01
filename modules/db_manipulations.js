var pg = require('pg');
var client = new pg.Client('pg://localhost:5432/antrello_test');
client.connect();

module.exports = function (test) {
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
    getLastIdFromTable: function (table, task) {
      this.query({
        query: 'SELECT last_value FROM ' + table + '_id_seq;',
      }, task);
    },
    deleteLastRowFromTable: function (table) {
      this.query({
        query: 'DELETE FROM ' + table + ' WHERE id = (SELECT last_value FROM ' + table + '_id_seq);',
      });
    },
    getRowFromTable: function (table, id, task) {
      this.query({
        query: 'SELECT * FROM ' + table + ' WHERE id = $1',
        options: [id],
      }, task);
    },
    addRowToTable: function (table, options, task) {
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

  return storage;
};