var ListCards = Backbone.Collection.extend({
  comparator: 'position',
  model: Card,
  url: '/cards',
  updatePositionsAndSort: function (action, movedCard) {
    collectionHelpers.updatePositionsAndSort.call(this, action, movedCard);
  },
  update: function (card) {
    card.save();
  },
  createCard: function (card, cardSource) {
    var newCard = this.create(card, {
      success: function() {
        this.trigger('sync:create');

        if (newCard.get('labels')) {
          newCard.get('labels').each(function (label) {
            App.labels.trigger('toggle_card', label, newCard.id);
          });
        }

        if (cardSource) {
          App.activities.trigger('create_copy_card_activity', cardSource, newCard);
        } else {
          App.activities.trigger('create_add_card_activity', newCard);
        }
      }.bind(this),
    });

    if (!newCard.get('labels')) { newCard.set('labels', new CardLabels()); }
    if (!newCard.get('comments')) { newCard.set('comments', new Comments()); }

    this.updatePositionsAndSort('add', newCard);
    App.cards.trigger('add_card', newCard);
  },
  archiveCards: function () {
    _.invoke(this.toArray(), 'destroy');
  },
  addAndUpdate: function (cards) {
    var cardIds = _.pluck(cards, 'id');

    this.add(cards);
    _.invoke(this.filter(function (card) {
      return _.contains(cardIds, card.get('id'));
    }), 'save');
  },
  initialize: function () {
    this.on({
      'create_card': this.createCard,
      'change:list_id change:name change:description': this.update,
      'change:due_date change:subscriber change:position': this.update,
      'archive_cards': this.archiveCards,
      'remove_cards': this.reset,
      'add_cards': this.addAndUpdate,
    });

    this.on('move_card_remove', function (card) {
      this.updatePositionsAndSort('remove', card);
    });

    this.on('move_card_add', function (card) {
      this.updatePositionsAndSort('add', card);
      this.update(card);
    });
  },
});