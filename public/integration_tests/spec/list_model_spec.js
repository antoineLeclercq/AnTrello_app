describe('List Model', function () {
  beforeEach(function () {
    this.list = new List(lists_scaffold[0]);
    this.list.set('cards', new ListCards(_.where(cards_scaffold, { list_id: this.list.id })));
  });

  it('creates new models with attributes', function () {
    expect(this.list.get('name')).toBeDefined();
    expect(this.list.get('cards')).toBeDefined();
  });

  it('has a collection of cards as an attribute', function () {
    expect(this.list.get('cards') instanceof ListCards).toBe(true);
    expect(this.list.get('cards').length).toEqual(_.where(cards_scaffold, { list_id: this.list.id }).length);
  });
});