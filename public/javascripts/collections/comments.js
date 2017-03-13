var Comments = Backbone.Collection.extend({
  url: '/comments',
  model: Comment,
  initialize: function () {
    this.on('create_comment', function (comment) {
      var newComment = this.create(comment, {
        success: function () {
          App.activities.trigger('create_comment_activity', newComment);
        },
      });
    });
  }
});