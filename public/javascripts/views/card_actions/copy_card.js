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
    var newCardData = {
      position: position,
      name: newName,
      list_id: listId,
      description: this.model.get('description'),
      due_date: this.model.get('due_date'),
    };
    var flags = {
      labels: this.$el.find('[name="labels"]').is(':checked'),
      comments: this.$el.find('[name="comments"]').is(':checked'),
    };

    cardsDest.trigger('copy_card', newCardData, this.model, flags);
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
    positionsAndListNames.positions.push({ position: _.chain(positionsAndListNames.positions).pluck('position').max().value() + 1 });
    positionsAndListNames.lists = view_helpers.getFormatedListNames(currentListName);

    if (this.model.get('labels').length|| this.model.get('comments').length) {
      positionsAndListNames.labelsComments = view_helpers.getFormatedLalbelsComments(this.model);
    }

    this.$el.html(this.template(positionsAndListNames));
    this.$el.find('.card-name textarea').val(currentCardNameInput || this.model.get('name'));
    this.$el.appendTo($('.card-edit'));
  },
  initialize: function () {
    this.render();
    this.listenTo(App, 'render_copy_card_form', this.remove);
  },
});