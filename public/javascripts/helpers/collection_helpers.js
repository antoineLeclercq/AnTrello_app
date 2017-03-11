var collectionHelpers = {
  updatePositionsAndSort: function (action, movedItem) {
    var pivotPosition = movedItem.get('position');

    this.each(function (item) {
      var position = item.get('position');

      if (item === movedItem || position < pivotPosition) { return; }

      if (action === 'add') {
        item.set('position', position + 1);
      } else if (action === 'remove') {
        item.set('position', position - 1);
      }
    });

    this.sort();
  },
};