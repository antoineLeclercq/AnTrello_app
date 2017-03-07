var CardsView = Backbone.View.extend({
  template: App.templates.cards,
  events: {
    'click .card': 'displayCard',
  },
  render: function () {
    this.$el.html(this.template({ cards: this.collection.toJSON() }));
  },
  bindSortingEvents: function () {
    this.sortableAndMoveableCards();
    this.tiltCardWhileSorting();
    this.updateCardsInfoOnDrop();
  },
  displayCard: function (e) {
    var $card = $(e.currentTarget);
    var cardId = $card.attr('data-id');
    var card = this.collection.get(cardId);

    new CardView({
      model: card
    });
  },
  sortableAndMoveableCards: function() {
    this.$el.sortable({
      connectWith: '.cards',
      forcePlaceholderSize: true,
      placeholder: "sortable-card-placeholder",
      items: '> li',
    });

    this.$el.disableSelection();
  },
  tiltCardWhileSorting: function() {
    this.$el.on('sortstart sortstop', function (event, ui) {
      ui.item.toggleClass('tilted', event.type === 'sortstart');
    });
  },
  updateCardsInfoOnDrop: function () {
    this.$el.on('sortdeactivate', function (event, ui) {
      if (event.target === ui.sender.get(0)) {
        this.updateCardsOnSort(event, ui);
      }
    }. bind(this));
  },
  updateCardsOnSort: function (event, ui) {
    var oldList = App.lists.get($(ui.sender).closest('.list').attr('data-id'));
    var $cardElement = ui.item;
    var cardId = $cardElement.attr('data-id');
    var cardPosition = $cardElement.closest('.cards').find('.card').index($cardElement);
    var newListId = Number($cardElement.closest('.list').attr('data-id'));
    var newList = App.lists.get(newListId);
    var card = oldList.get('cards').remove(cardId, { silent: true });

    this.collection.trigger('move_card_remove', card);
    card.set({
      list_id: newListId,
      position: cardPosition,
    });
    newList.get('cards').add(card, { silent: true });
    this.collection.trigger('move_card_add', card);
  },
  initialize: function () {
    this.render();
    this.listenTo(this.collection, 'create_card', this.render);
    this.bindSortingEvents();
    this.listenTo(App, 'render_board', this.remove);
  },
});