var DueDateView = Backbone.View.extend({
  tagName: 'section',
  attributes: {
    class: 'modal due-date-form',
  },
  template: App.templates.due_date_form,
  events: {
    'click input[value="Save"]': 'saveDueDateCard',
    'click input[value="Remove"]': 'removeDueDateCard',
    'click .overlay': 'remove',
  },
  saveDueDateCard: function (e) {
    e.preventDefault();
    var date = this.$el.find('[name="date"]').val();
    var time = this.$el.find('[name="time"]').val();
    var newDueDate = moment(date + ' ' + time).format();

    this.model.trigger('save_due_date', 'due_date', newDueDate);
  },
  removeDueDateCard: function (e) {
    e.preventDefault();
    this.model.trigger('remove_due_date', 'due_date', null);
  },
  render: function () {
    this.$el.html(this.template());
    this.$el.css('top', $('#card-details').find('.action.due-date').position().top + 5);
    $('#card-details').find('.add .actions').append(this.$el);
  },
  initializeDatePickerAndTime: function () {
    var formatedDueDate = moment(this.model.get('due_date')).format('MM/DD/YYYY');
    var time = moment(this.model.get('due_date')).format('HH:mm');

    this.$el.find('.datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
      altField: 'input[name="date"]',
    });
    this.$el.find('.datepicker').datepicker('setDate', formatedDueDate);
    this.$el.find('[type=time]').val(time);
  },
  initialize: function () {
    this.render();
    this.listenTo(App, 'render_due_date_form', this.remove);
    this.initializeDatePickerAndTime();
  }
});