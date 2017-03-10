var router = new (Backbone.Router.extend({
  routes: {
    'card/:id': 'cardDetailsView',
  },
  cardDetailsView: function (id) {
    App.cardDetailsView(id);
  },
  initialize: function () {
    this.route(/^\/?$/, 'index');
  },
}))();

Backbone.history.start({
  pushState: true
});