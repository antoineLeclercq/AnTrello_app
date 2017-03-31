var Notifications = Backbone.Collection.extend({
  url: '/notifications',
  model: Notification,
  updateNotifsStatus: function () {
    this.each(function (notif) {
      notif.set('seen', true);
      notif.save();
    });
  },
  fetchsForSubscribedCards: function () {
    this.fetch();
  },
  initialize: function () {
    this.on({
      'fetch': this.fetch,
      'notifications_seen': this.updateNotifsStatus,
    });
    this.listenTo(App.activities, 'update', this.fetchsForSubscribedCards);
  },
});