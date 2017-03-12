var App = {
  templates: JST,
  addCardsToLists: function () {
    App.lists.each(function (list) {
      list.set('cards', new ListCards(this.cards.where({ list_id: list.id })));
    }.bind(this));
  },
  addLabelsToCards: function () {
    App.cards.each(function (card) {
      card.set('labels', new CardLabels(this.labels.filter(function (label) {
        return _.contains(label.get('card_ids'), card.id);
      })));
    }.bind(this));
  },
  indexView: function () {
    this.addCardsToLists();
    this.addLabelsToCards();

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

    this.bindAutoResizeTextareaEvent();
  },
  renderListFormView: function () {
    new ListFormView();
  },
  cardDetailsView: function (id) {
    new CardView({ model: this.cards.get(id) });
    this.bindAutoResizeTextareaEvent();
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

Handlebars.registerHelper('format_date', function (date) {
  return moment(date).calendar(null, {
      lastDay : '[Yesterday at] LT',
      sameDay : '[Today at] LT',
      nextDay : '[Tomorrow at] LT',
      lastWeek : 'MMM DD [at] LT',
      nextWeek : 'MMM DD [at] LT',
      sameElse : 'MMM DD [at] LT'
  });
});

Handlebars.registerHelper('format_date_preview', function (date) {
  return moment(date).format('MMM DD');
});