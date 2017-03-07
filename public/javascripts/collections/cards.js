var Cards = Backbone.Collection.extend({
  comparator: 'position',
  model: Card,
  url: '/cards',
  updatePositions: function (action, movedCard) {
    var pivotPosition = movedCard.get('position');

    this.each(function (card) {
      var position = card.get('position');

      if (card === movedCard || position < pivotPosition) { return; }

      if (action === 'add') {
        if (position >= pivotPosition) { card.set('position', position + 1); }
      } else if (action === 'remove') {
        if (position > pivotPosition) { card.set('position', position - 1); }
      }
    });
  },
  updatePositionsAndSort: function (card, action) {
    this.updatePositions(action, card);
    this.sort();
  },
  syncUpdateAndRender: function (card) {
    this.sync('update', card);
  },
  updatePositionsAndSortAndSync: function (card) {
    this.updatePositionsAndSort(card, 'add');
    this.syncUpdateAndRender(card);
  },
  updatePositionsAndSortAndRender: function (card) {
    this.updatePositionsAndSort(card, 'remove');
  },
  initialize: function () {
    this.on({
      'create_card': this.create,
      'change': this.syncUpdateAndRender,
      'move_card_add': this.updatePositionsAndSortAndSync,
      'move_card_remove': this.updatePositionsAndSortAndRender,
    });
  },
});