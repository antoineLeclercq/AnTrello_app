var LabelsView = Backbone.View.extend({
  tagName: 'section',
  template: App.templates.labels,
  events: {
    'click .overlay, .close': 'remove',
    'click .label': 'toggleLabel',
    'click .edit': 'renderEditLabelView',
  },
  toggleLabel: function (e) {
    var label = App.labels.get($(e.currentTarget).attr('data-id'));

    App.labels.trigger('toggle_card', label, this.model.id);
    this.model.get('labels').trigger('toggle_label', label);
    this.model.trigger('toggle_label');
  },
  renderEditLabelView: function (e) {
    var labelId = $(e.currentTarget).prev().attr('data-id');
    var btnPosition = $(e.currentTarget).offset();
    var top = btnPosition.top;
    var left = btnPosition.left - 200;

    new EditLabelView({
      model: App.labels.get(labelId),
      attributes: {
        class: 'modal edit-label-form',
        style: 'top:' + top + 'px;left:' + left + 'px;',
      }
    });

    this.remove();
  },
  render: function () {
    var labelsData = view_helpers.formatLabelsDataForTemplate(this.model.id);

    this.$el.html(this.template(labelsData));
    this.$el.appendTo($('.card-edit'));
  },
  initialize: function () {
    this.render();
    this.listenTo(App, 'render_labels_form', this.remove);
  },
});