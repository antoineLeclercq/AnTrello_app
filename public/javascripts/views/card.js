var CardView = Backbone.View.extend({
  attributes: {
    id: "card-details",
  },
  template: App.templates.card,
  events: {
    'click .container > .close, > .overlay': 'removeView',
    'focusout .title': 'updateName',
    'click .description > a, .description .close': 'toggleDescriptionForm',
    'submit .description form': 'updateDescriptionAndRender',
    'click .due-date': 'renderDueDateView',
    'click .archive': 'archiveCard',
  },
  removeView: function () {
    this.remove();
    router.navigate('/');
  },
  updateName: function (e) {
    var $titleTextarea = $(e.target);
    var newName = $titleTextarea.val().trim();

    if (newName !== this.model.get('name')) {
      this.model.trigger('update_name', 'name', newName);
    }
  },
  toggleDescriptionForm: function (e) {
    e.preventDefault();
    this.$el.find('.description > a, .description form').toggle();
  },
  updateDescriptionAndRender: function (e) {
    e.preventDefault();
    var $form = $(e.target);
    var newDescription = $form.find('textarea').val().trim();

    if (newDescription === this.model.get('description')) {
      this.toggleDescriptionForm();
    } else {
      this.model.trigger('update_description', 'description', newDescription);
      this.render();
    }
  },
  renderDueDateView: function (e) {
    App.trigger('render_due_date_form');
    new DueDateView({ model: this.model });
  },
  archiveCard: function () {
    this.model.trigger('archive_card');
    this.remove();
    this.navigate('/');
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
    this.listenTo(this.model, 'change', this.render);
  },
});