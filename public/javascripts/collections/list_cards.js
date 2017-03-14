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
  createCard: function (card) {
    var newCard = this.create(card, {
      success: function() {
        this.trigger('sync:create');
        App.activities.trigger('create_add_card_activity', newCard);
      }.bind(this),
    });

    newCard.set('labels', new CardLabels());
    newCard.set('comments', new Comments());

    this.updatePositionsAndSort('add', newCard);
    App.cards.trigger('add_card', newCard);
  },
  copyCard: function (card, cardSource, flags) {
    var newCard = this.create(card, {
      success: function() {
        if (flags.labels) {
          cardSource.get('labels').each(function (label) {
            newCard.get('labels').trigger('toggle_label', label);
            App.labels.trigger('toggle_card', label, newCard.id);
          });
        }

        if (flags.comments) {
          cardSource.get('comments').each(function (comment) {
            var newComment = _.omit(comment.toJSON(), 'id');

            newComment.card_id = newCard.id;
            newCard.get('comments').trigger('copy_comment', newComment, cardSource);
          });
        }

        this.trigger('sync:copy');
        App.activities.trigger('create_copy_card_activity', cardSource, newCard);
      }.bind(this),
    });

    newCard.set('labels', new CardLabels());
    newCard.set('comments', new Comments());

    this.updatePositionsAndSort('add', newCard);
    App.cards.trigger('add_card', newCard);
  },
  updateAndUpdateNotifications: function (card) {
    card.save();
    App.notifications.trigger('fetch');
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
      'copy_card': this.copyCard,
      'change:list_id change:name change:description': this.update,
      'change:due_date change:position': this.update,
      'change:subscriber': this.updateAndUpdateNotifications,
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