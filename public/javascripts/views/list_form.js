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
      cards: new ListCards(),
    };

    if (data.name) {
      App.lists.trigger('create_list', data);
      $form.find('.close').trigger('click');
    } else {
      $input.focus();
    }
  },
  toggleForm: function (e) {
    var $target = $(e.target);
    var closeBtn =  $target.closest('.close');

    this.$el.toggleClass('show', !closeBtn.length);
    if(closeBtn.length) { $target.closest('form').find('[name=list_name]').val(''); }
  }
});