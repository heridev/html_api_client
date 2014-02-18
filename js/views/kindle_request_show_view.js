KindlesApp.Views.KindleRequestShowView = Backbone.View.extend({

  tagName: 'article',

  events: {
    'click .delete-kindle-request'    :    'removeKindleRequest'
  },

  render: function() {
    var _this = this;
    this.$el.loadFromTemplate({
      template : 'show_kindle_request',
      data : _this.model.attributes,
      render_method: 'html',
      extension : ".html",
      async_mode: false,
      path: 'templates/',
    });
    return this;
  },

  removeKindleRequest: function(event){
    event.preventDefault();

    if (confirm('Está seguro de que desea eliminar este kindle?')) {
      this.model.destroy({
        success: function(model, response) {
          $.jGrowl("The kindle request was destroyed successfully", {
            position: 'center'
          });
          KindlesApp.Router.navigate('kindle-requests', { trigger: true });
        },
        error: function(model, response) {
          alert('ocurrio un error al momento de eliminar');
        }
      });
    }
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

