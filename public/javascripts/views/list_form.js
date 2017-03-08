var ListFormView = Backbone.View.extend({
  el: $('.container > .add-list').get(0),
  events: {
    'submit form': 'createList',
    'click': 'toggleForm',
  },
  createList: function (e) {
    e.preventDefault();
    var $form = $(e.target);
    var $input = $form.find('[name=list_name]');
    var data = {
      name: $input.val().trim(),
      position: $('.list').length,
    };

    if (data.name) {
      App.lists.trigger('create_list', data);
      $input.val('');
      this.$el.removeClass('show');
    } else {
      $input.focus();
    }
  },
  toggleForm: function (e) {
    this.$el.toggleClass('show', $(e.target).closest('.close').length);
  }
});