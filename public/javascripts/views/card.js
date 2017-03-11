var CardView = Backbone.View.extend({
  attributes: {
    id: 'card-details',
  },
  template: App.templates.card,
  events: {
    'click .container > .close, > .overlay': 'removeView',
    'focusout .title': 'updateName',
    'click .description > a, .description .close': 'toggleDescriptionForm',
    'submit .description form': 'updateDescriptionAndRender',
    'click .actions .labels, .labels .label': 'renderLabelsView',
    'click .due-date': 'renderDueDateView',
    'click .move-card': 'renderMoveCardView',
    'click .archive': 'archiveCard',
    'click .copy-card': 'renderCopyCardView',
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
  renderLabelsView: function (e) {
    var actionBtnPosition = $(e.currentTarget).offset();
    var top = actionBtnPosition.top + 5;
    var left = actionBtnPosition.left;

    App.trigger('render_labels_form');
    new LabelsView({
      model: this.model,
      attributes: {
        class: 'modal labels-form',
        style: 'top:' + top + 'px;left:' + left + 'px;',
      }
    });
  },
  renderDueDateView: function (e) {
    var actionBtnPosition = $(e.currentTarget).offset();
    var top = actionBtnPosition.top + 5;
    var left = actionBtnPosition.left;

    App.trigger('render_due_date_form');
    new DueDateView({
      model: this.model,
      attributes: {
        class: 'modal due-date-form',
        style: 'top:' + top + 'px;left:' + left + 'px;',
      }
    });
  },
  renderMoveCardView: function (e) {
    var actionBtnPosition = $(e.currentTarget).offset();
    var top = actionBtnPosition.top + 5;
    var left = actionBtnPosition.left;

    App.trigger('render_move_card_form');
    new MoveCardView({
      model: this.model,
      attributes: {
        class: 'modal move',
        style: 'top:' + top + 'px;left:' + left + 'px;',
      }
    });
  },
  renderCopyCardView: function (e) {
    var actionBtnPosition = $(e.currentTarget).offset();
    var top = actionBtnPosition.top - 150;
    var left = actionBtnPosition.left;

    App.trigger('render_copy_card_form');
    new CopyCardView({
      model: this.model,
      attributes: {
        class: 'modal copy',
        style: 'top:' + top + 'px;left:' + left + 'px;',
      }
    });
  },
  archiveCard: function () {
    this.model.trigger('archive_card');
    this.remove();
    router.navigate('/');
  },
  formatCardData: function () {
    var cardData = this.model.toJSON();

    cardData.listName = App.lists.get(cardData.list_id).get('name');
    cardData.labels = cardData.labels.toJSON();
    return cardData;
  },
  renderAndDisplayLabelsForm: function () {
    this.render();
    $('.actions .labels').trigger('click');
  },
  render: function () {
    var card = this.formatCardData();

    this.$el.html(this.template(card));
    this.$el.appendTo(document.body);
  },
  initialize: function () {
    this.render();
    this.$el.attr('data-id', this.model.id);
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'toggle_label edit_label', this.renderAndDisplayLabelsForm);
  },
});