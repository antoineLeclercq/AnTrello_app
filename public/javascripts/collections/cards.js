var Cards = Backbone.Collection.extend({
  model: Card,
  url: '/cards',
});