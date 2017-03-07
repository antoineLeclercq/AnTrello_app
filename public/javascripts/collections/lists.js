var Lists = Backbone.Collection.extend({
  model: List,
  url: '/lists',
  comparator: 'position',
  update: function (list) {
    this.sync('update', list);
  },
  updatePositions: function (action, movedList) {
    var pivotPosition = movedList.get('position');

    this.each(function (list) {
      var position = list.get('position');

      if (list === movedList || position < pivotPosition) { return; }

      if (action === 'add') {
        if (position >= pivotPosition) { list.set('position', position + 1); }
      } else if (action === 'remove') {
        if (position > pivotPosition) { list.set('position', position - 1); }
      }
    });
  },
  deleteList: function (list) {
    this.sync('delete', list);
    this.remove(list);    
  },
  initialize: function () {
    this.on({
      'create_list': this.create,
      'destroy_list': this.deleteList,
      'change:position': this.update,
      'change:name': this.update,
    });

    this.on('move_list_add', function (list) {
      this.updatePositions('add', list);
      this.update(list);
    });

    this.on('move_list_remove', function (list) {
      this.updatePositions('remove', list);
    });
  },
});