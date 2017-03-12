var Comments = Backbone.Collection.extend({
  url: '/comments',
  model: Comment,
  initialize: function () {
    this.on('create_comment', this.create);
  }
});