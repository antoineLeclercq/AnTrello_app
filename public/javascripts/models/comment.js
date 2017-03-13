var Comment = Backbone.Model.extend({
  updateComment: function (newContent) {
    this.set('content', newContent);
    this.save();
  },
  deleteRelatedActivities: function () {
    App.activities.trigger('delete_activity', App.activities.where({ comment_id: this.id }));
  },
  initialize: function () {
    this.on('update_comment', this.updateComment);
    this.on('delete_comment', this.destroy);
    this.on('destroy', this.deleteRelatedActivities);
  },
});