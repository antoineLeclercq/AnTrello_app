var App = {
  templates: JST,
  indexView: function () {
    this.renderLists();
    this.renderCardFormView();
    this.renderListFormView();

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
  bindAutoResizeTextareaEvent: function () {
    $('textarea').on('keypress', function (e) {
      autosize(this);
    });
  },
  bindEvents: function () {
    this.on('render_board', this.renderCardFormView);
  }
};

_.extend(App, Backbone.Events);

$('main > .container').css({
  'min-width': screen.availWidth,
  'min-height': screen.availHeight - 200
});