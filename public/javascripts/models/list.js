var List = Backbone.Model.extend({
  initialize: function () {
    this.set('cards', new Cards(this.get('cards')));
  },
});