var Cards = Backbone.Collection.extend({
  url: '/cards',
  model: Card,
  initialize: function () {
    this.on('add_card', this.add);
  },
});