var root = 'http://localhost:3000';
var request = require('request');
var path = require('path');
var storageTest = require(path.resolve(path.dirname(__dirname), 'modules/tests/db_manipulations.js'));
var moment = require('moment');
var _ = require('underscore');
var authorizedRoutes = ['lists', 'cards', 'comments', 'labels', 'activities', 'notifications'];

describe('POST /:collection route', function () {
  var tablesAndData = [{
      collection: 'lists',
      table: 'list',
      data: {
        name: 'test list',
        position: 0
      },
    }, {
      collection: 'cards',
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
      collection: 'comments',
      table: 'comment',
      data: {
        card_id: 2,
        content: 'test comment'
      },
    }, {
      collection: 'labels',
      table: 'label',
      data: {
        name: 'test label',
        color: '#ffffff'
      },
    }, {
      collection: 'activities',
      table: 'activity',
      data: {
        card_id: 2,
        list_id_source: 2,
        list_id_dest: 3,
        action: 'move',
        actionable_item: 'card',
        date: moment().format(),
      },
    }, {
      collection: 'notifications',
      table: 'notification',
      data: {
        activity_id: 1,
        seen: true,
      },
    }
  ];

  for (var i = 0; i < tablesAndData.length; i ++) {
    testTable('/' + tablesAndData[i].collection + '/new' , tablesAndData[i].table, tablesAndData[i].data);
  }

  function testTable(route, table, data) {
    afterEach(function () {
      storageTest.deleteLastRowFromTable(table);
    });

    it('creates a new' + table + 'in the database', function (done) {
      request.post({ url: root + route, form: data }, function (error, response, body) {
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
});