KindlesApp.Views.AddKindleRequestView = Backbone.View.extend({

  initialize: function(){
    Cocktail.mixin(this, Mixins.HandleErrors);
  },

  events: {
    'click #create-request'   :   'addKindleRequest'
  },

  render: function() {
    var _this = this;
    this.$el.loadFromTemplate({
      template : 'add_kindle_request',
      render_method: 'html',
      extension : ".html",
      data: {},
      path: 'templates/',
    });
    return this;
  },

  addKindleRequest: function(event){
    event.preventDefault()
    var data, form;
    var kindleModel = new KindlesApp.Models.KindleRequestModel();
    var _this = this;
    data = { status: 'in_progress', amount_day: 0 }

    var options = {
      success: function() {
        $.jGrowl("You kindle request was created successfully", {
          position: 'center'
        });
        KindlesApp.Router.navigate('add-kindle-request', { trigger: true });
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

