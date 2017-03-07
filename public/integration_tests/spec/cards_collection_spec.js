describe('Cards Collection', function () {
  beforeEach(function () {
    this.cards = new Cards(cards_scaffold);
  });

  it('creates new collection of cards', function () {
    expect(this.cards.get(1)).toBeDefined();
    expect(this.cards.get(1) instanceof Card).toBe(true);
    expect(this.cards.get(1).get('name')).toBeDefined();
    expect(this.cards.get(1).get('position')).toBeDefined();
  });

  it('sorts cards by position on collection update', function () {
    spyOn(this.cards, 'sort');
    this.cards.add({ id: 10, position: this.cards.length });

    expect(this.cards.sort).toHaveBeenCalledTimes(1);
  });

  it('updates positions when card is removed', function () {
    var removedCard = this.cards.remove(_.findWhere(this.cards.toJSON(), { position: 1 }).id);
    this.cards.trigger('move_card_remove', removedCard);

    expect(this.cards.pluck('position')).toEqual(generatePositions(this.cards.length));
  });

  describe('updates positions and sorts when card is added', function () {
    it('handles edge case of adding card at first position', function () {
      var addedCard = this.cards.add({ id: 10, name: 'test card', position: 0 });
      this.cards.trigger('move_card_add', addedCard);
      
      expect(this.cards.pluck('position')).toEqual(generatePositions(this.cards.length));
    });

    it('handles edge case of adding card at last position', function () {
      var addedCard = this.cards.add({ id: 10, name: 'test card', position: this.cards.length });
      this.cards.trigger('move_card_add', addedCard);

      expect(this.cards.pluck('position')).toEqual(generatePositions(this.cards.length));
    });

    it('handles other cases', function () {
      var addedCard = this.cards.add({ id: 10, name: 'test card', position: Math.floor(this.cards.length / 2) });
      this.cards.trigger('move_card_add', addedCard);

      expect(this.cards.pluck('position')).toEqual(generatePositions(this.cards.length));
    });
  });
});