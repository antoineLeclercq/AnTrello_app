var App = {
  templates: JST,
  indexView: function () {
    this.renderLists();
    this.renderCardFormView();
    this.renderListFormView();

    this.bindToggleAddListFormEvents();
    this.bindAutoResizeTextareaEvent();

    this.bindEvents();
  },
  renderLists: function () {
    this.listsView = new ListsView({ collection: this.lists });
  },
  renderCardFormView: function () {
    this.lists.each(function (listModel) {
      new CardFormView({
        model: listModel,
        el: $('.list[data-id=' + listModel.id + '] .add-card').get(0),
      });
    });
  },
  renderListFormView: function () {
    new ListFormView();
  },
  // renderCards: function () {
  //   App.lists.each(function (list) {
  //     new CardsView({
  //       collection: list.get('cards'),
  //       el: $('.list[data-id=' + list.id + '] .cards').get(0),
  //     });
  //   });
  // },
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
    this.listenTo(this.listsView, 'render', this.renderCardFormView);
  }
};

_.extend(App, Backbone.Events);

$('main > .container').css({
  'min-width': screen.availWidth,
  'min-height': screen.availHeight,
});