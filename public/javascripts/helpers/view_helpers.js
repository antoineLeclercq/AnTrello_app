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
  getFormatedListNames: function (currentListName) {
    return App.lists.map(function (list) {
      var listData = { name: list.get('name'), id: list.id };

      if (listData.name === currentListName) { listData.current = currentListName; }

      return listData;
    });
  },
  getFormatedLalbelsComments: function (card) {
    return {
      labelsCount: card.get('labels').length,
      // commentsCount: card.get('comments').length,
    }
  },
  updateListNameAndPositions: function (e) {
    var listId =  Number($(e.target).find('option:selected').attr('data-id'));
    var position;
    var cards;
    var newCardPositions;

    if (listId === this.model.get('list_id')) {
      this.render();
    } else {
      position = $(e.target).find('option:selected').val();
      cards = App.cards.where({ list_id: listId });
      newCardPositions = view_helpers.getFormatedCardPositions(cards);

      if (_.isEmpty(newCardPositions)) {
        newCardPositions.push({ position: 1 });
      } else {
        newCardPositions.push({ position: _.chain(newCardPositions).pluck('position').max().value() + 1 });
      }

      this.$el.find('.list-name p').text(position);
      this.$el.find('.card-position select').html(App.templates.card_positions({ positions: newCardPositions }));
      this.$el.find('.card-position select').trigger('change');
    }
  },
  formatLabelsDataForTemplate: function (cardId) {
    var data = App.labels.toJSON();

    data.forEach(function (label) {
      label.checked = _.contains(label.card_ids, cardId);
    });

    return { labels: data };
  },
};