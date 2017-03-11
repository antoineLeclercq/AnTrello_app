var CardLabels = Backbone.Collection.extend({
  model: Label,
  comparator: 'id',
  initialize: function () {
    this.on('toggle_label', function (label) {
      this.get(label) ? this.remove(label) : this.add(label);
    });
  }
});