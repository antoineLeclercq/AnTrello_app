var Activities = Backbone.Collection.extend({
  url: '/activities',
  model: Activity,
  comparator: function (first, second) {
    if (moment(first.get('date')).isBefore(second.get('date'))) {
      return 1;
    } else if (moment(first.get('date')).isSame(second.get('date'))) {
      return 0;
    } else {
      return -1;
    }
  },
  createAddCardActivity: function (card) {
    var activityData = {
      action: 'add',
      actionable_item: 'card',
      card_id: card.id,
      list_id_dest: card.get('list_id'),
      date: moment().format(),
    };

    this.create(activityData);
  },
  createMoveCardActivity: function (card) {
    var activityData = {
      action: 'move',
      actionable_item: 'card',
      card_id: card.id,
      list_id_source: card.previous('list_id'),
      list_id_dest: card.get('list_id'),
      date: moment().format(),
    };

    this.create(activityData);
  },
  createCopyCardActivity: function (cardSource, newCard) {
    var activityData = {
      action: 'copy',
      actionable_item: 'card',
      card_id: newCard.id,
      card_id_source: cardSource.id,
      list_id_dest: newCard.get('list_id'),
      date: moment().format(),
    };

    this.create(activityData);
  },
  createAddCommentActivity: function (comment) {
    var activityData = {
      action: 'add',
      actionable_item: 'comment',
      card_id: comment.get('card_id'),
      comment_id: comment.id,
      date: moment().format(),
    };

    this.create(activityData);
  },
  createCopyCommentActivity: function (comment, cardSource) {
    var activityData = {
      action: 'copy',
      actionable_item: 'comment',
      card_id: comment.get('card_id'),
      comment_id: comment.id,
      card_id_source: cardSource.id,
      date: moment().format(),
    };

    this.create(activityData);
  },
  createUpdateDueDateActivity: function (card) {
    var activityData = {
      action: card.previous('due_date') ? 'change' : 'add',
      actionable_item: 'due_date',
      card_id: card.id,
      due_date: card.get('due_date'),
      date: moment().format(),
    };

    this.create(activityData);
  },
  createRemoveDueDateActivity: function (card) {
    var activityData = {
      action: 'remove',
      actionable_item: 'due_date',
      card_id: card.id,
      date: moment().format(),
    };

    this.create(activityData);
  },
  initialize: function () {
    this.on({
      'create_add_card_activity': this.createAddCardActivity,
      'create_move_card_activity': this.createMoveCardActivity,
      'create_copy_card_activity': this.createCopyCardActivity,
      'create_add_comment_activity': this.createAddCommentActivity,
      'create_copy_comment_activity': this.createCopyCommentActivity,
      'create_update_due_date_activity': this.createUpdateDueDateActivity,
      'create_remove_due_date_activity': this.createRemoveDueDateActivity,
      'delete_activity': this.remove,
    });
  },
});