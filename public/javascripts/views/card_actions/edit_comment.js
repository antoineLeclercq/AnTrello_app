var EditCommentView = Backbone.View.extend({
  template: App.templates.comment_form,
  events: {
    'click .close': 'removeAndRenderCard',
    'submit form': 'editComment',
  },
  editComment: function (e) {
    e.preventDefault();
    var newContent = this.$el.find('textarea').val().trim();

    if (newContent && newContent !== this.model.get('content')) {
      this.model.trigger('update_comment', newContent);
      App.trigger('render_card');
    }
  },
  removeAndRenderCard: function (e) {
    App.trigger('render_card');
    this.remove();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
  },
  initialize: function () {
    this.render();
  },
});