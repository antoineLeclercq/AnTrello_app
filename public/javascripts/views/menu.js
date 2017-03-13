var MenuView = Backbone.View.extend({
  el: $('#menu'),
  template: App.templates.menu,
  events: {
    'click .close': 'hideMenu',
    'click .card-name': 'showCard',
  },
  hideMenu: function () {
    this.$el.animate({
      right: -350,
    }, 200);
  },
  showCard: function (e) {
    e.preventDefault();
    var path = $(e.target).attr('href');

    router.navigate(path, { trigger: true });
  },
  render: function () {
    this.$el.html(this.template({ activities: view_helpers.formatActivitiesData(App.activities.models) }));
  },
  initialize: function () {
    this.render();
    this.listenTo(App.activities, 'update', this.render);
  },
});