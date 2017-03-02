var ListView = Backbone.View.extend({
  attributes: {
    class: 'list-container',
  },
  template: App.templates.list,
  events: {
    'click .list > header .more': 'toggleMoreOptionsModal',
    'click .list > .overlay': 'toggleMoreOptionsModal'
  },
  toggleMoreOptionsModal: function (e) {
    this.$el.find('> .modal, > .overlay').toggle();
  },
  render: function () {
    var listJSON = this.model.toJSON();
    listJSON.cards = listJSON.cards.toJSON();

    this.$el.html(this.template(listJSON));
    $('#lists').append(this.$el);
  },
  initialize: function () {
    this.render();
  },
});