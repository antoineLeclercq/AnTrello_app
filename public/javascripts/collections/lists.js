var Lists = Backbone.Collection.extend({
  model: List,
  url: '/lists',
  comparator: 'position',
  update: function (list) {
    list.save();
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
  copyList: function (list, newName) {
    var position = list.get('position') + 1;
    var newListData = {
      name: newName,
      position: position,
    };
    var newList = this.create(newListData, {
      success: function () {
        this.updatePositionsAndSort('add', newList);

        newList.set('cards', new ListCards());
        list.get('cards').each(function (card) {
          var cardData = _.omit(card.toJSON(), ['id', 'subscriber', 'list_id']);

          cardData.list_id = newList.id;
          newList.get('cards').trigger('copy_card', cardData, card, { labels: true, comments: true });
        });

        this.trigger('sync:copy');
      }.bind(this),
    });
  },
  archiveList: function (list) {
    list.destroy();
    this.trigger('move_list_remove', list);
  },
  initialize: function () {
    this.on({
      'create_list': this.createList,
      'copy_list': this.copyList,
      'archive_list': this.archiveList,
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