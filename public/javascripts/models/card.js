var Card = Backbone.Model.extend({
  defaults: {
    subscriber: false,
  },
  createComment: function (comment) {
    this.get('comments').trigger('create_comment', comment);
  },
  archiveCard: function () {
    App.lists.get(this.get('list_id')).get('cards').trigger('move_card_remove', this);
    this.destroy();
  },
  saveDueDate: function (newDueDate) {
    this.set('due_date', newDueDate);
    App.activities.trigger('create_update_due_date_activity', this);
  },
  removeDueDate: function () {
    this.unset('due_date');
    App.activities.trigger('create_remove_due_date_activity', this);
  },
  initialize: function () {
    this.on({
      'update_name': this.set,
      'update_description': this.set,
      'save_due_date': this.saveDueDate,
      'remove_due_date': this.removeDueDate,
      'archive_card': this.archiveCard,
      'create_comment': this.createComment,
      'change:list_id': function () {
        App.activities.trigger('create_move_card_activity', this);
      },
    });
  },
});