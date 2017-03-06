var Cards = Backbone.Collection.extend({
  comparator: 'position',
  model: Card,
  url: '/cards',
  initialize: function () {
    this.on('create_card', this.create);
    this.on('change update', function () {
      App.lists.trigger('change:cards');
    });
  },
});