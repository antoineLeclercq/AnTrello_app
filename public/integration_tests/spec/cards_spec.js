describe('Cards Collection', function () {
  beforeEach(function () {
    this.cards = new Cards(lists_scaffold);
  });

  it('creates new collection of cards', function () {
    expect(this.cards.get(1)).toBeDefined();
    expect(this.cards.get(1) instanceof Card).toBe(true);
    expect(this.cards.get(1).get('name')).toBeDefined();
    expect(this.cards.get(1).get('position')).toBeDefined();
  });
});