var KindleView = Backbone.View.extend({

  tagName: 'article',

  initialize: function(options){
    this.template = options.template || 'kindle_details'
    this.render_method = (options.render_method || 'append')
  },

  events: {
    "click .edit-kindle"        : "editKindle"
  },

  render: function() {
    var _this = this;
    this.$el.loadFromTemplate({
      template : _this.template,
      data : _this.model,
      render_method: _this.render_method,
      extension : ".html",
      async_mode: false,
      path: 'templates/',
    });
    return this;
  },

  editKindle: function(event){
    event.preventDefault();
    var element = this.$(event.currentTarget).closest( "div" )
    kindle = this.setKindle(element);

    kindle.fetch({
      success: function() {
        var view = new kindleEditView({
          model: kindle
        });
        element.html(view.render().el);
      }
    });
  },

  setKindle: function(element){
    var kindleId = element.attr('id');

    return new KindleModel({
      id: kindleId
    });
  }


});
