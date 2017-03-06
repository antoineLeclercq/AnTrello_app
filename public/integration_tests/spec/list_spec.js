describe('List Model', function () {
  beforeEach(function () {
    this.list = new List(lists_scaffold[0]);
  });

  it('creates new models with attributes', function () {
    expect(this.list.get('name')).toBeDefined();
    expect(this.list.get('cards')).toBeDefined();
  });

  it('has a collection of cards as an attribute', function () {
    expect(this.list.get('cards') instanceof Cards).toBe(true);
    expect(this.list.get('cards').length).toEqual(lists_scaffold[0].cards.length);
  });
});