var CardQuickEditView = Backbone.View.extend({
  tagName: 'section',
  template: App.templates.card_quick_edit,
  events: {
    'click .overlay, .close': 'remove',
    'click .actions .labels': CardView.prototype.renderLabelsView,
    'click .actions .due-date': CardView.prototype.renderDueDateView,
    'click .actions .move-card': CardView.prototype.renderMoveCardView,
    'click .actions .archive': CardView.prototype.archiveCard,
    'click .actions .copy-card': CardView.prototype.renderCopyCardView,
    'submit form': 'updateName',
  },
  updateName: function (e) {
    e.preventDefault();
    var newName = this.$el.find('textarea').val().trim();

    if (newName !== this.model.get('name')) {
      this.model.trigger('update_name', 'name', newName);
    }

    this.remove();
  },
  render: function () {
    var cardData = this.model.toJSON();

    cardData.labels = cardData.labels.toJSON();
    cardData.commentsCount = cardData.comments.length;

    this.$el.html(this.template(cardData));
    this.$el.appendTo(document.body);
  },
  initialize: function () {
    this.render();
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'toggle_label edit_label', CardView.prototype.renderAndDisplayLabelsForm.bind(this));
  },
});