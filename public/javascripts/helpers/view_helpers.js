var view_helpers = {
  removeAndRenderListActions: function () {
    // 1 click to close + 1 click to display
    $('.list[data-id="' + this.model.id + '"] .more').trigger('click').trigger('click');
    this.remove();
  },
};