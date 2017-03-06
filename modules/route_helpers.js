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
    },
    labels: {
      table: 'label'
    },
    activities: {
      table: 'activity',
    }
  },
}

module.exports = helpers;