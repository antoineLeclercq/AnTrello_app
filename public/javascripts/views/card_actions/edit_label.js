var EditLabelView = Backbone.View.extend({
  tagName: 'section',
  template: App.templates.edit_label_form,
  events: {
    'click .overlay, .close': 'remove',
    'submit form': 'updateLabelName',
  },
  updateLabelName: function (e) {
    e.preventDefault();
    var name = this.$el.find('input[name="name"]').val().trim();

    if (name !== this.model.get('name')) {
      this.model.trigger('update_name', 'name', name);
    }

    App.cards.get(this.$el.closest('#card-details').attr('data-id')).trigger('edit_label');
    this.remove();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo($('#card-details'));
  },
  initialize: function () {
    this.render();
  }
});