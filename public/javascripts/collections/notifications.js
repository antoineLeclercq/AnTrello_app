var Notifications = Backbone.Collection.extend({
  url: '/notifications',
  model: Notification,
  updateNotifsStatus: function () {
    this.each(function (notif) {
      notif.set('seen', true);
      notif.save();
    });
  },
  initialize: function () {
    this.on({
      'fetch': this.fetch,
      'notifications_seen': this.updateNotifsStatus,
    });
  },
});