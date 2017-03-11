var view_helpers = {
  removeAndRenderListActions: function () {
    // 1 click to close + 1 click to display
    $('.list[data-id="' + this.model.id + '"] .more').trigger('click').trigger('click');
    this.remove();
  },
  formatPositionsForTemplate: function (pos, currentPosition) {
    var position = { position: pos + 1 };

    if (pos + 1 === currentPosition) { position.current = currentPosition; }
    return position;
  },
  getFormatedCardPositions: function (cards, currentPosition) {
    return _.chain(cards)
      .invoke('toJSON')
      .pluck('position')
      .sort()
      .map(function (pos) {
        return view_helpers.formatPositionsForTemplate(pos, currentPosition);
      })
      .value();
  },
  formatLabelsDataForTemplate: function (cardId) {
    var data = App.labels.toJSON();

    data.forEach(function (label) {
      label.checked = _.contains(label.card_ids, cardId);
    });

    return { labels: data };
  },
};