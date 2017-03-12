var CardFormView = Backbone.View.extend({
  events: {
    'click a': 'toggleForm',
    'submit form': 'createCard',
  },
  toggleForm: function (e) {
    if (e) { e.preventDefault(); }

    this.$el.find('> a, form').toggle();
  },
  createCard: function (e) {
    e.preventDefault();
    var $form = $(e.target);
    var $input = $form.find('[name=card_name]');
    var data = {
      name: $input.val().trim(),
      position: this.$el.closest('.list').find('.card-preview').length,
      list_id: this.model.id,
    };

    if (data.name) {
      this.model.get('cards').trigger('create_card', data);
      this.toggleForm();
      $input.val('');
    }
  },
});