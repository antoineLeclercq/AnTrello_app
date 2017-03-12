var Card = Backbone.Model.extend({
  defaults: {
    subscriber: false,
  },
  createComment: function (comment) {
    this.get('comments').trigger('create_comment', comment);
  },
  initialize: function () {
    this.on({
      'update_name': this.set,
      'update_description': this.set,
      'save_due_date': this.set,
      'remove_due_date': this.set,
      'archive_card': this.destroy,
      'create_comment': this.createComment,
    });
  },
});