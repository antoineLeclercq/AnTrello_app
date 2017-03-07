var Cards = Backbone.Collection.extend({
  comparator: 'position',
  model: Card,
  url: '/cards',
  updatePositionsAndSort: function (action, movedCard) {
    collectionHelpers.updatePositionsAndSort.call(this, action, movedCard);
  },
  update: function (card) {
    this.sync('update', card);
  },
  createCard: function (card) {
    this.create(card, {
      success: function() {
        this.trigger('sync:create');
      }.bind(this),
    });
  },
  initialize: function () {
    this.on({
      'create_card': this.createCard,
      'change': this.update,
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