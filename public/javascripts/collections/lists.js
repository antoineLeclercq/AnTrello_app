var Lists = Backbone.Collection.extend({
  model: List,
  url: '/lists',
  comparator: 'position',
  update: function (list) {
    this.sync('update', list);
  },
  updatePositionsAndSort: function (action, movedList) {
    collectionHelpers.updatePositionsAndSort.call(this, action, movedList);
  },
  createList: function (list) {
    this.create(list, {
      success: function() {
        this.trigger('sync:create');
      }.bind(this),
    });
  },
  deleteList: function (list) {
    this.sync('delete', list);
    this.remove(list);
    this.trigger('move_list_remove', list);
  },
  initialize: function () {
    this.on({
      'create_list': this.createList,
      'destroy_list': this.deleteList,
      'change:position': this.update,
      'change:name': this.update,
    });

    this.on('move_list_add', function (list) {
      this.updatePositionsAndSort('add', list);
      this.update(list);
    });

    this.on('move_list_remove', function (list) {
      this.updatePositionsAndSort('remove', list);
    });
  },
});