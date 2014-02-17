var addKindleView = Backbone.View.extend({

  initialize: function(){
    Cocktail.mixin(this, Mixins.HandleErrors);
  },

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
    var _this = this;

    form = this.$('#add-kindle-form');
    data = form.serializeObject();

    var options = {
      success: function() {
        KindlesApp.Router.navigate('kindles', { trigger: true });
      },
      error: function(model, response){
        _this.showErrors(response);
      }
    }

    kindleModel.save(data, options);
  },

  showErrors: function(response) {
    this.$('.error-area').html('');
    this.$('.input-group').removeClass('has-error');
    this.displayErrors(response);
   }
});

