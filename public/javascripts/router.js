var router = new (Backbone.Router.extend({
  routes: {
  },
  indexView: function () {
    App.indexView();
  },
  initialize: function () {
    this.route(/^\/?$/, 'index', this.indexView);
  },
}))();

Backbone.history.start({
  pushState: true
});