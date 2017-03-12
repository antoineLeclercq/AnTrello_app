var Cards = Backbone.Collection.extend({
  model: Card,
  initialize: function () {
    this.on('add_card', this.add);
  },
});