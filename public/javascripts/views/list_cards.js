var ListCardsView = Backbone.View.extend({
  template: App.templates.cards,
  events: {
    'click .card': 'renderCardDetailsView',
    'click .edit': 'renderCardQuickEditView',
  },
  render: function () {
    cardsData = this.collection.toJSON().map(function (card) {
      card.labels = card.labels.toJSON();
      return card;
    });
    this.$el.html(this.template({ cards: cardsData }));
  },
  bindSortingEvents: function () {
    this.sortableAndMoveableCards();
    this.tiltCardWhileSorting();
    this.updateCardsInfoOnDrop();
  },
  renderCardDetailsView: function (e) {
    var $card = $(e.currentTarget);
    var cardId = $card.attr('data-id');
    var card = this.collection.get(cardId);

    router.navigate('/card/' + cardId, { trigger: true });
  },
  renderCardQuickEditView: function (e) {
    e.stopPropagation();
  },
  sortableAndMoveableCards: function() {
    this.$el.sortable({
      connectWith: '.cards',
      forcePlaceholderSize: true,
      placeholder: "sortable-card-placeholder",
      items: '> li',
      delay: 150
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
    var oldListCards = App.lists.get($(ui.sender).closest('.list').attr('data-id')).get('cards');
    var $cardElement = ui.item;
    var cardId = $cardElement.attr('data-id');
    var cardPosition = $cardElement.closest('.cards').find('.card').index($cardElement);
    var newListId = Number($cardElement.closest('.list').attr('data-id'));
    var newListCards = App.lists.get(newListId).get('cards');
    var card = oldListCards.remove(cardId, { silent: true });

    oldListCards.trigger('move_card_remove', card);
    card.set({
      list_id: newListId,
      position: cardPosition,
    });
    newListCards.add(card, { silent: true });
    newListCards.trigger('move_card_add', card);
  },
  initialize: function () {
    var listCardsCollectionEvents = 'create_card ' +
      'sync:create ' +
      'archive_cards ' +
      'archive_card ' +
      'remove_cards ' +
      'change:name change:description change:subscriber change:due_date ' +
      'toggle_label ' +
      'add_cards ' +
      'move_card';

    this.render();
    this.listenTo(this.collection, listCardsCollectionEvents, this.render);
    this.bindSortingEvents();
    this.listenTo(App, 'render_board', this.remove);
  },
});