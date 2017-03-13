var Comments = Backbone.Collection.extend({
  url: '/comments',
  model: Comment,
  createComment: function (comment) {
    var newComment = this.create(comment, {
      success: function () {
        App.activities.trigger('create_add_comment_activity', newComment);
      },
    });
  },
  copyComment: function (comment, cardSource) {
    var newComment = this.create(comment, {
      success: function () {
        App.activities.trigger('create_copy_comment_activity', newComment, cardSource);
      },
    });
  },
  initialize: function () {
    this.on({
      'create_comment': this.createComment,
      'copy_comment': this.copyComment,
    });
  },
});