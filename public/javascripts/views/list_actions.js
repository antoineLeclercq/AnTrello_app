var ListActionsView = Backbone.View.extend({
  template: App.templates.list_actions,
  events: {
    'click .move-list': 'renderMoveListView',
    'click .copy-list': 'renderCopyListView',
  },
  renderMoveListView: function () {
    App.trigger('render_move_list_form');

    new MoveListView({
      model: this.model,
    });
  },
  renderCopyListView: function () {
    App.trigger('render_copy_list_form');

    new CopyListView({
      model: this.model,
    });
  },
  render: function () {
    this.$el.html(this.template());
    $('.list[data-id="' + this.model.id + '"] > .modal').html(this.$el);
  },
  initialize: function () {
    this.render();
    this.listenTo(App, 'render_actions', this.remove);
  },
});