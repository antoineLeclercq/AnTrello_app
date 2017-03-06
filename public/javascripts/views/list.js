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
    this.$el.find('.list > .modal, .list > .overlay').toggle();
  },
  previousList: function () {
    return $('.list').get(this.model.get('position') - 1);
  },
  render: function () {
    var prevList = this.previousList();
    var listJSON = this.model.toJSON();
    listJSON.cards = listJSON.cards.toJSON();

    this.$el.html(this.template(listJSON));

    if (prevList) {
      this.$el.insertAfter(this.previousList());
    } else {
      this.$el.prependTo($('#lists'));
    }
  },
  initialize: function () {
    this.render();
    this.listenTo(this.model, 'change sync', this.render);
    this.listenTo(this.model.get('cards'), 'change sync', this.render);
  },
});