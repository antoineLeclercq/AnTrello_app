var Label = Backbone.Model.extend({
  initialize: function () {
    this.on('update_name', this.set);
  },
});