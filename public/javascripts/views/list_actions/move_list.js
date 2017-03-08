var MoveListView = Backbone.View.extend({
  attributes: {
    class: 'move',
  },
  template: App.templates.move_list_form,
  events: {
    'change select': 'updateDisplayedPosition',
    'click .prev': view_helpers.removeAndRenderListActions,
    'submit form': 'updateListPosition',
  },
  updateDisplayedPosition: function (e) {
    var position = $(e.target).find('option:selected').val();
    this.$el.find('p').text(position);
  },
  updateListPosition: function (e) {
    e.preventDefault();
    var position = $(e.target).find('option:selected').val() - 1;

    App.lists.remove(this.model);
    App.lists.trigger('move_list_remove', this.model);

    this.model.set('position', position);

    App.lists.add(this.model);
    App.lists.trigger('move_list_add', this.model);

    App.lists.trigger('move_list');
  },
  render: function () {
    var currentPosition = this.model.get('position') + 1;
    var positions = App.lists.pluck('position').map(function (pos) {
      var position = { position: pos + 1 };
      if (pos + 1 === currentPosition) { position.current = currentPosition; }
      return position;
    });

    this.$el.html(this.template({ positions: positions, currentPosition: currentPosition }));
    $('.list[data-id="' + this.model.id + '"] > .modal').html(this.$el);
  },
  initialize: function () {
    this.render();
    this.listenTo(App, 'render_move_list_form', this.remove);
  },
});