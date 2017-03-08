var CopyListView = Backbone.View.extend({
  attributes: {
    class: 'copy',
  },
  template: App.templates.copy_list_form,
  events: {
    'click .prev': view_helpers.removeAndRenderListActions,
    'submit form': 'copyAndCreateList',
  },
  copyAndCreateList: function (e) {
    e.preventDefault();
    var name = this.$el.find('textarea').val().trim();

    if (name) { App.lists.trigger('copy_list', this.model, name); }
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    $('.list[data-id="' + this.model.id + '"] > .modal').html(this.$el);
  },
  initialize: function () {
    this.render();
    this.listenTo(App, 'render_copy_list_form', this.remove);
  },
});