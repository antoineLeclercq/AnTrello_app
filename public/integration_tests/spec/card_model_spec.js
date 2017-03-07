describe('Card Model', function () {
  beforeEach(function () {
    this.card = new Card(cards_scaffold[0]);
  });

  it('creates new models with list attributes', function () {
    expect(this.card.get('name')).toBeDefined();
    expect(typeof this.card.get('subscriber')).toBe('boolean');
    expect(this.card.get('position')).toBe(cards_scaffold[0].position);
  });
});