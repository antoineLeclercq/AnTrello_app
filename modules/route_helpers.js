var _ = require('underscore');

var helpers = {
  validRoutesAndDBInfo: {
    lists: {
      table: 'list',
      colNames: ['name', 'position'],
    },
    cards: {
      table: 'card',
      colNames: ['list_id', 'name', 'description', 'due_date', 'position', 'subscriber'],
    },
    comments: {
      table: 'comment',
      colNames: ['card_id', 'content'],
    },
    labels: {
      table: 'label',
      colNames: ['name'],
    },
    card_label: {
      table: 'card_label',
      colNames: ['card_id', 'label_id'],
    },
    activities: {
      table: 'activity',
    }
  },
  isValidCardId: function (id, cards) {
    return _.findWhere(cards, { id: id });
  },
};

module.exports = helpers;