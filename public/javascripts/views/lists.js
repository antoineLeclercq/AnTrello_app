var ListsView = Backbone.View.extend({
  el: $('#lists').get(0),
  template: App.templates.lists,
  events: {
    'click .list > .overlay, .list > .modal .close, .list > header .more': 'toggleMoreOptionsModal',
    'focusout .title': 'updateListName',
    'click .card': 'displayCard',
  },
  toggleMoreOptionsModal: function (e) {
    var $list = $(e.target).closest('.list');
    $list.find('> .modal, > .overlay').toggle();
  },
  updateListName: function (e) {
    var $titleTextarea = $(e.target);
    var newName = $titleTextarea.val().trim();
    var listId = $titleTextarea.closest('.list').attr('data-id');
    var list = this.collection.get(listId);

    if (newName !== list.get('name')) {
      list.set('name', newName);
      this.collection.trigger('update_list', list);
    }
  },
  displayCard: function (e) {
    var $card = $(e.currentTarget);
    var cardId = $card.attr('data-id');
    var listId =  $card.closest('.list').attr('data-id');
    var card = this.collection.get(listId).get('cards').get(cardId);

    new CardView({
      model: card
    });
  },
  render: function () {
    var lists = this.collection.toJSON();

    lists.forEach(function (list) {
      list.cards = list.cards.toJSON();
    });

    this.$el.html(this.template({ lists: lists }));
    this.trigger('render');
  },
  initialize: function () {
    this.render();
    this.listenTo(this.collection, 'update sync sort change:cards', this.render);
  },
});