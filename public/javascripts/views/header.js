var HeaderView = Backbone.View.extend({
  el: $('header').get(0),
  events: {
    'focusin form input': 'displayFocusedInput',
    'click form .search': 'focusInput',
    'click form .close': 'clearInputAndSearchResults',
    'input form input': 'searchForCards',
    'click .menu': 'displayMenu',
  },
  displayFocusedInput: function (e) {
    $(e.target).addClass('focus');
  },
  clearInputAndSearchResults: function (e) {
    var $input = $(e.target).closest('form').find('input');

    $input.removeClass('focus').val('');
    App.trigger('remove_search_results');
  },
  focusInput: function (e) {
    $(e.target).closest('form').find('input').focus();
  },
  searchForCards: function (e) {
    var input = $(e.target).val().trim().toLowerCase();
    var cards;

    if (input) {
      cards = App.cards.filter(function (card) {
        return RegExp(input).test(card.get('name').toLowerCase());
      });

      App.trigger('remove_search_results');
      new SearchResultsView({ collection: new Cards(cards) });
    } else {
      App.trigger('remove_search_results');
    }
  },
  displayMenu: function (e) {
    $('#menu').animate({
      right: 0,
    }, 200);
  },
});