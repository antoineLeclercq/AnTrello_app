describe('Lists Collection', function () {
  beforeEach(function () {
    this.lists = new Lists(lists_scaffold);
    this.lists.each(function (list) {
      list.set('cards', new ListCards(_.where(cards_scaffold, { list_id: list.id })));
    });
  });

  it('creates new collection of lists', function () {
    expect(this.lists.get(1)).toBeDefined();
    expect(this.lists.get(1) instanceof List).toBe(true);
    expect(this.lists.get(1).get('name')).toBeDefined();
    expect(this.lists.get(1).get('cards')).toBeDefined();
  });

  it('sorts list by position on collection update', function () {
    spyOn(this.lists, 'sort');
    this.lists.add({ id: 10, position: this.lists.length });

    expect(this.lists.sort).toHaveBeenCalledTimes(1);
  });

  it('updates positions when list is removed', function () {
    var removedList = this.lists.remove(_.findWhere(this.lists.toJSON(), { position: 1 }).id);
    this.lists.trigger('move_list_remove', removedList);

    expect(this.lists.pluck('position')).toEqual(generatePositions(this.lists.length));
  });

  describe('updates positions and sorts when list is added', function () {
    it('handles edge case of adding list at first position', function () {
      var addedList = this.lists.add({ id: 10, name: 'test list', position: 0 });
      this.lists.trigger('move_list_add', addedList);

      expect(this.lists.pluck('position')).toEqual(generatePositions(this.lists.length));
    });

    it('handles edge case of adding list at last position', function () {
      var addedList = this.lists.add({ id: 10, name: 'test list', position: this.lists.length });
      this.lists.trigger('move_list_add', addedList);

      expect(this.lists.pluck('position')).toEqual(generatePositions(this.lists.length));
    });

    it('handles other cases', function () {
      var addedList = this.lists.add({ id: 10, name: 'test list', position: Math.floor(this.lists.length / 2) });
      this.lists.trigger('move_list_add', addedList);

      expect(this.lists.pluck('position')).toEqual(generatePositions(this.lists.length));
    });
  });
});