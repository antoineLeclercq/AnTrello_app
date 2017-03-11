var CopyCardView = Backbone.View.extend({
  tagName: 'section',
  template: App.templates.copy_card_form,
  events: {
    'change .list-name select': view_helpers.updateListNameAndPositions,
    'change .card-position select': 'updatePosition',
    'click .overlay, .close': 'remove',
    'submit form': 'copyCard',
  },
  updatePosition: function (e) {
    var position = $(e.target).find('option:selected').val();

    this.$el.find('.card-position p').text(position);
  },
  copyCard: function (e) {
    e.preventDefault();
    var $form = $(e.target);
    var listId = Number($form.find('.list-name select option:selected').attr('data-id'));
    var cardsDest = App.lists.get(listId).get('cards');
    var position = $form.find('.card-position select option:selected').val() - 1;
    var newName = $form.find('.card-name textarea').val();
    var newCardData = this.model.toJSON();

    delete newCardData.id;
    newCardData.position = position;
    newCardData.name = newName;
    newCardData.list_id = listId;

    if (!$('[name="labels"]').is(':checked')) { delete newCardData.labels; }
    // if (!$('[name="comments"]').is(':checked')) { newCardData.comments = new Comments(); }

    cardsDest.trigger('create_card', newCardData);
    this.remove();
  },
  render: function () {
    var currentListId = this.model.get('list_id');
    var currentListName = App.lists.get(currentListId).get('name');
    var currentPosition = this.model.get('position') + 1;
    var cards = App.cards.where({ list_id: this.model.get('list_id') });
    var positionsAndListNames =  { currentList: currentListName, currentPosition: currentPosition };
    var currentCardNameInput = this.$el.find('.card-name textarea').val();

    positionsAndListNames.positions = view_helpers.getFormatedCardPositions(cards, currentPosition);
    positionsAndListNames.lists = view_helpers.getFormatedListNames(currentListName);

    if (this.model.get('labels').length)
    // || this.model.get('comments').length)
    {
      positionsAndListNames.labelsComments = view_helpers.getFormatedLalbelsComments(this.model);
    }

    this.$el.html(this.template(positionsAndListNames));
    this.$el.find('.card-name textarea').val(currentCardNameInput || this.model.get('name'));
    this.$el.appendTo($('#card-details'));
  },
  initialize: function () {
    this.render();
    this.listenTo(App, 'render_copy_card_form', this.remove);
  },
});