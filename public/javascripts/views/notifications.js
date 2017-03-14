var NotificationsView = Backbone.View.extend({
  el: $('#notif').get(0),
  template: App.templates.notifications,
  events: {
    'click .modal .close': 'hide',
    'click .notif-btn': 'toggle',
  },
  hide: function () {
    this.$el.find('.modal').hide();
    this.render();
  },
  toggle: function (e) {
    e.preventDefault();
    var $modal = this.$el.find('.modal');

    if ($modal.is(':visible')){
      $modal.hide();
    } else {
      $modal.show();
      this.collection.trigger('notifications_seen');
      this.render();
      this.$el.find('.modal').show();
    }
  },
  render: function () {
    this.$el.html(this.template({
      notifications: view_helpers.formatActivitiesData(this.collection.models),
      new: App.notifications.any(function (notification) {
        return !notification.get('seen');
      }),
    }));
  },
  initialize: function () {
    this.render();
    this.listenTo(this.collection, 'sync' , this.render);
  },
});