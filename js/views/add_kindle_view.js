var addKindleView = Backbone.View.extend({

  events: {
    'click .add-kindle'   :   'addKindle'
  },

  render: function() {
    var _this = this;
    this.$el.loadFromTemplate({
      template : 'add_kindle',
      render_method: 'html',
      extension : ".html",
      data: {},
      path: 'templates/',
    });
    return this;
  },

  addKindle: function(event){
    event.preventDefault()
    var data, form;
    var kindleModel = new KindleModel();

    form = this.$('#add-kindle-form');
    data = form.serializeObject();
    kindleModel.save(data, {
      success: function(data) {
        KindlesApp.Router.navigate('kindles', { trigger: true});
      }
    });

  }


});
