var Labels = Backbone.Collection.extend({
  url: '/labels',
  model: Label,
  comparator: 'id',
  update: function (label, cardId) {
    var method;

    if (_.contains(label.get('card_ids'), cardId)) {
      method = 'DELETE';
      label.set('card_ids', _.without(label.get('card_ids'), cardId));
    } else {
      method = 'POST';
      label.set('card_ids', label.get('card_ids').concat(cardId));
    }

    $.ajax({
      url: '/card_label',
      method: method,
      data: {
        label_id: label.id,
        card_id: cardId,
      },
    });
  },
  updateLabel: function (label) {
    label.save();
  },
  initialize: function () {
    this.on({
      'toggle_card': this.update,
      'change:name': this.updateLabel,
    });
  },
});