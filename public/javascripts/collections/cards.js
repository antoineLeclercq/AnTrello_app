var Cards = Backbone.Collection.extend({
  url: '/cards',
  model: Card,
  removeCardsInDeletedList: function (list) {
    _.invoke(this.where({ list_id: list.id }), 'destroy');
  },
  initialize: function () {
    this.on('add_card', this.add);
    this.on('delete_cards_in_list', this.removeCardsInDeletedList);
  },
});