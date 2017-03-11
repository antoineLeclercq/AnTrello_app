var LabelsView = Backbone.View.extend({
  tagName: 'section',
  template: App.templates.labels,
  events: {
    'click .overlay, .close': 'remove',
    'click .label': 'toggleLabel',
  },
  toggleLabel: function (e) {
    var label = App.labels.get($(e.currentTarget).attr('data-id'));

    App.labels.trigger('toggle_card', label, this.model.id);
    this.model.get('labels').trigger('toggle_label', label);
    this.model.trigger('toggle_label');
  },
  render: function () {
    var labelsData = view_helpers.formatLabelsDataForTemplate(this.model.id);

    this.$el.html(this.template(labelsData));
    this.$el.appendTo($('#card-details'));
  },
  initialize: function () {
    this.render();
    this.listenTo(App, 'render_labels_form', this.remove);
  },
});