var CardView = Backbone.View.extend({
  attributes: {
    id: "card-details",
  },
  template: App.templates.card,
  events: {
    'click .container > .close, > .overlay': 'removeView'
  },
  removeView: function () {
    this.remove();
  },
  formatCardData: function () {
    var cardData = this.model.toJSON();

    cardData.listName = App.lists.get(cardData.list_id).get('name');

    return cardData;
  },
  render: function () {
    var card = this.formatCardData();

    this.$el.html(this.template(card));
    this.$el.appendTo(document.body);
  },
  initialize: function () {
    this.render();
  },
});