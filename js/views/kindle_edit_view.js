var kindleEditView = Backbone.View.extend({

  tagName: 'article',

  events: {
    'click .save-kindle'   :   'saveChanges'
  },

  render: function() {
    var _this = this;
    this.$el.loadFromTemplate({
      template : "kindle_edit",
      data : _this.model.attributes,
      render_method: 'html',
      extension : ".html",
      async_mode: false,
      path: 'templates/',
    });
    return this;
  },

  saveChanges: function(event){
    event.preventDefault();
    var data, form,
      _this = this;
    form = this.$('#edit-kindle-form');
    data = form.serializeObject();
    this.model.save(data, {
      success: function(data) {
        var currentView = new KindleView({
          model: data.attributes,
          render_method: 'html'
        });
        elementId = "#" + data.id;
        $(elementId).parent().replaceWith((currentView.render().el));
      }
    });
  }

});
