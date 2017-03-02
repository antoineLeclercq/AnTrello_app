var App = {
  templates: JST,
  indexView: function () {
    this.renderLists();
    this.bindToggleAddListFormEvents();
    this.bindAutoResizeTextareaEvent();
    this.bindEvents();

    new AddListView();
  },
  renderLists: function () {
    App.lists.each(function (list) {
      new ListView({ model: list });
    });
  },
  renderNewList: function (list) {
    new ListView({ model: list });
  },
  bindToggleAddListFormEvents: function () {
    $('.add-list').on('click', function (e) {
      var $div = $(e.currentTarget);

      if ($(e.target).closest('.close').length) {
        e.preventDefault();
        $div.removeClass('show');
      } else {
        $div.addClass('show');
      }
    });
  },
  bindAutoResizeTextareaEvent: function () {
    $('textarea').on('keypress', function (e) {
      autosize(this);
    });
  },
  bindEvents: function () {
    this.listenTo(this.lists, 'sync', this.renderNewList);
  },
};

_.extend(App, Backbone.Events);

$('main > .container').css({
  'min-width': screen.availWidth,
  'min-height': screen.availHeight,
});