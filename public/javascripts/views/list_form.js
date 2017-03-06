var ListFormView = Backbone.View.extend({
  el: $('.add-list').get(0),
  events: {
    'submit form': 'createList',
  },
  createList: function (e) {
    e.preventDefault();
    var $form = $(e.target);
    var $input = $form.find('[name=list_name]');
    var data = {
      name: $input.val().trim(),
      position: $('.list').length + 1,
    };

    if (data.name) {
      App.lists.trigger('create_list', data);
      $form.removeClass('show');
      $input.val('');
    } else {
      $input.focus();
    }
  },
});