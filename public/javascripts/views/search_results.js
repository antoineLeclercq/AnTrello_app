var SearchResultsView = Backbone.View.extend({
  tagName: 'section',
  attributes: {
    class: 'search-results modal',
  },
  template: App.templates.search_results,
  events: {
    'click .overlay': 'removeAndHideFocusInput',
    'click a': 'renderCardView',
  },
  removeAndHideFocusInput: function () {
    this.remove();
    $('header form input').removeClass('focus').val('');
  },
  renderCardView: function (e) {
    e.preventDefault();
    router.navigate($(e.target).attr('href'), { trigger: true });
    this.removeAndHideFocusInput();
  },
  render: function () {
    var cardsData = this.collection.toJSON().map(function (card) {
      card.list_name = App.lists.get(card.list_id).get('name');
      return card;
    });

    this.$el.html(this.template({ cards: cardsData }));
    this.$el.appendTo(document.body);
  },
  initialize: function () {
    this.render();
    this.listenTo(App, 'remove_search_results', this.remove);
  },
});