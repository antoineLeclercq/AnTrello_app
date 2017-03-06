var Lists = Backbone.Collection.extend({
  model: List,
  url: '/lists',
  comparator: 'position',
  update: function (list) {
    this.sync('update', list);
  },
  initialize: function () {
    this.on('create_list', this.create);
    this.on('change:position', this.sort);
    this.on('update_list', this.update);
  },
});