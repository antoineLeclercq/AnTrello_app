describe('Lists Collection', function () {
  beforeEach(function () {
    this.lists = new Lists(lists_scaffold);
  });

  it('creates new collection of lists', function () {
    expect(this.lists.get(1)).toBeDefined();
    expect(this.lists.get(1) instanceof List).toBe(true);
    expect(this.lists.get(1).get('name')).toBeDefined();
    expect(this.lists.get(1).get('cards')).toBeDefined();
  });
});