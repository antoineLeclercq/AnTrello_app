var MoveCardsView = Backbone.View.extend({
  attributes: {
    class: 'move-all-cards',
  },
  template: App.templates.move_cards_form,
  events: {
    'click .prev': view_helpers.removeAndRenderListActions,
    'click li + li': 'moveCards',
  },
  moveCards: function (e) {
    var cardsSource = this.model.get('cards').toJSON();
    var listIdDest = $(e.currentTarget).attr('data-id')
    var cardsDest =  App.lists.get(listIdDest).get('cards');
    var positionsDest = cardsDest.pluck('position');
    var lastPositionDest = _.isEmpty(positionsDest) ? 0 : _.max(positionsDest);

    this.model.get('cards').trigger('remove_cards');
    cardsSource.forEach(function (card, index) {
      card.position = lastPositionDest ? lastPositionDest + (index + 1) : lastPositionDest;
      card.list_id = listIdDest;
    });
    cardsDest.trigger('add_cards', cardsSource);
  },
  render: function () {
    var lists = App.lists.reject(function (list) {
      return this.model === list;
    }.bind(this));

    lists = _.invoke(lists, 'toJSON');
    this.$el.html(this.template({ current: this.model.get('name'), lists: lists }));
    $('.list[data-id="' + this.model.id + '"] > .modal').html(this.$el);
  },
  initialize: function () {
    this.render();
    this.listenTo(App, 'render_move_cards_form', this.remove);
  },
});