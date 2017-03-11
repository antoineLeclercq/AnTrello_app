var MoveCardView = Backbone.View.extend({
  tagName: 'section',
  template: App.templates.move_card_form,
  events: {
    'change .list-name select': 'updateListNameAndPositions',
    'change .card-position select': 'updatePosition',
    'click .overlay, .close': 'remove',
    'submit form': 'updateCardListAndPosition',
  },
  updateListNameAndPositions: function (e) {
    var listId =  Number($(e.target).find('option:selected').attr('data-id'));
    var position = $(e.target).find('option:selected').val();
    var cards = App.cards.where({ list_id: listId });
    var newCardPositions = view_helpers.getFormatedCardPositions(cards);

    if (_.isEmpty(newCardPositions)) {
      newCardPositions.push({ position: 1 });
    } else {
      newCardPositions.push({ position: _.chain(newCardPositions).pluck('position').max().value() + 1 });
    }

    this.$el.find('.list-name p').text(position);
    this.$el.find('.card-position select').html(App.templates.card_positions({ positions: newCardPositions }));
    this.$el.find('.card-position select').trigger('change');
  },
  updatePosition: function (e) {
    var position = $(e.target).find('option:selected').val();

    this.$el.find('.card-position p').text(position);
  },
  updateCardListAndPosition: function (e) {
    e.preventDefault();
    var cardsSource = App.lists.get(this.model.get('list_id')).get('cards');
    var listId = Number($(e.target).find('.list-name select option:selected').attr('data-id'));
    var cardsDest = App.lists.get(listId).get('cards');
    var position = $(e.target).find('.card-position select option:selected').val() - 1;

    cardsSource.remove(this.model);
    cardsSource.trigger('move_card_remove', this.model);

    this.model.set({ position: position, list_id: listId });

    cardsDest.add(this.model);
    cardsDest.trigger('move_card_add', this.model);

    cardsSource.trigger('move_card');
    cardsDest.trigger('move_card');
  },
  render: function () {
    var currentListId = this.model.get('list_id');
    var currentListName = App.lists.get(currentListId).get('name');
    var currentPosition = this.model.get('position') + 1;
    var cards = App.cards.where({ list_id: this.model.get('list_id') });
    var positionsAndListNames =  { currentList: currentListName, currentPosition: currentPosition };

    positionsAndListNames.positions = view_helpers.getFormatedCardPositions(cards, currentPosition);

    positionsAndListNames.lists = [];
    App.lists.each(function (list) {
      var listData = { name: list.get('name'), id: list.id };
      if (listData.name === currentListName) { listData.current = currentListName; }
      positionsAndListNames.lists.push(listData);
    });

    this.$el.html(this.template(positionsAndListNames));
    this.$el.appendTo($('#card-details'));
  },
  initialize: function () {
    this.render();
    this.listenTo(App, 'render_move_card_form', this.remove);
  },
});