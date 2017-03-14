var queries = {
  allLists: 'SELECT * FROM list;',
  allCards: 'SELECT * FROM card;',
  allListsAndCards: 'SELECT list.*, card.id  AS card_id, card.list_id as card_list_id, card.name  AS card_name, ' +
    'card.description  AS card_description, card.due_date  AS card_due_date, ' +
    'card.position  AS card_position, card.subscriber  AS card_subscriber ' +
    'FROM list ' +
    'LEFT JOIN card ON list.id = card.list_id ' +
    'ORDER BY list.id;',
  allLabelsAndCardIds: 'SELECT label.id, label.color, label.name, array_agg(card_id) AS card_ids ' +
    'FROM label ' +
    'LEFT JOIN card_label ' +
    'ON label.id = card_label.label_id ' +
    'GROUP BY label.id, label.color, label.name;',
  allComments: 'SELECT * FROM comment;',
  allActivities: 'SELECT * FROM activity ORDER BY date DESC',
  allNotifications: 'SELECT notification.*, activity.card_id, activity.card_id_source, activity.list_id_source, ' +
    'activity.list_id_dest, activity.comment_id, activity.action, activity.actionable_item, activity.date ' +
    'FROM notification ' +
    'INNER JOIN activity ' +
    'ON notification.activity_id = activity.id ' +
    'ORDER BY activity.date DESC;',
};

module.exports = queries;