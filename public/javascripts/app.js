var App = {
  templates: JST,
  indexView: function () {
    this.addCardsToLists();
    this.addLabelsToCards();

    this.renderHeaderView();
    this.renderNotificationsView();
    this.renderMenuView();
    this.renderLists();
    this.renderCardFormView();
    this.renderListFormView();

    this.bindAutoResizeTextareaEvent();
    this.bindEvents();
  },
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
  addCommentsToCards: function (comments) {
    App.cards.each(function (card) {
      card.set('comments', new Comments());

      comments.forEach(function (comment) {
        if (card.id === comment.card_id) {
          card.get('comments').add(comment);
        }
      });
    });
  },
  addActivitiesToCards: function (activities) {
    App.cards.each(function (card) {
      card.set('activities', new CardActivities(this.activities.filter(function (activity) {
        return activity.get('card_id') === card.id;
      })));
    }.bind(this));
  },
  renderHeaderView: function () {
    new HeaderView();
  },
  renderMenuView: function () {
    new MenuView();
  },
  renderNotificationsView: function () {
    new NotificationsView({ collection: App.notifications });
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
    $(document).on('keypress', 'textarea', function (e) {
      autosize(e.target);
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
  return view_helpers.formatDate(date);
});

Handlebars.registerHelper('format_date_preview', function (date) {
  return moment(date).format('MMM DD');
});