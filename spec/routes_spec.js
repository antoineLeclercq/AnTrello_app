var root = 'http://localhost:3000';
var request = require('request');
var path = require('path');
var storageTest = require(path.resolve(path.dirname(__dirname), 'modules/db_manipulations.js'))(true);
var moment = require('moment');
var _ = require('underscore');
var authorizedRoutes = ['list', 'card', 'comment', 'label', 'activity', 'notification'];

describe('new/:table route', function () {
  var tablesAndData = [{
      table: 'list',
      data: {
        name: 'test list',
        position: 0
      },
    }, {
      table: 'card',
      data: {
        list_id: 1,
        name: 'test card',
        description: 'description for card',
        due_date: moment().format(),
        position: 3,
        subscriber: false,
      },
    }, {
      table: 'comment',
      data: {
        card_id: 2,
        content: 'test comment'
      },
    }, {
      table: 'label',
      data: {
        name: 'test label',
        color: '#ffffff'
      },
    }, {
      table: 'activity',
      data: {
        card_id: 2,
        list_id_source: 2,
        list_id_dest: 3,
        action_id: 4,
        actionable_item_id: 1,
        date: moment().format(),
      },
    }
  ];

  for (var i = 0; i < tablesAndData.length; i ++) {
    testTable(tablesAndData[i].table, tablesAndData[i].data);
  }
});

function testTable(table, data) {
  afterEach(function () {
    storageTest.deleteLastRowFromTable(table);
  });

  it('creates a new' + table + 'in the database', function (done) {
    request.post({ url: root + '/new/' + table, form: data }, function (error, response, body) {
      if (error) { throw error; }

      storageTest.getLastIdFromTable(table, function (result) {
        var id = Number(result.rows[0].last_value);

        expect(JSON.parse(body).id).toBe(id);

        storageTest.getRowFromTable(table, id, function (result) {
          _.each(data, function (value, key) {
            if (/date/.test(key)) {
              expect(moment(result.rows[0][key]).format()).toBe(value);
            } else {
              expect(result.rows[0][key]).toBe(value);
            }
          });
          done();
        });
      });
    });
  });
}

describe('get/:table route', function () {

});