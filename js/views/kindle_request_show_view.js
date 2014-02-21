KindlesApp.Views.KindleRequestShowView = Backbone.View.extend({

  tagName: 'article',

  events: {
    'click .delete-kindle-request'   :    'removeKindleRequest',
    'click .assign-kindle'           :    'assignKindle',
    'click .return-kindle'           :    'returnKindle'
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
    this.addKindleSelectForm();
    return this;
  },

  addKindleSelectForm: function(){
    var request = $.get(KindlesApp.ServerUrl + '/api/kindles/available');

    request.success((function(_this) {
      return function(response) {
        _this.$('#kindles-select').loadFromTemplate({
          template : 'select_kindles_form',
          data : response,
          render_method: 'html',
          extension : ".html",
          async_mode: false,
          path: 'templates/',
        });
      };
    })(this));
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

  assignKindle: function(event){
    event.preventDefault();
    form = this.$('#assign-kindle-form');
    data = form.serializeObject();

    var options = {
      success: function() {
        $.jGrowl("You kindle request was updated successfully", {
          position: 'center'
        });
        KindlesApp.Router.navigate('kindle-requests', { trigger: true });
      },
      error: function(model, response){
        _this.showErrors(response);
      }
    }

    var options
    this.model.save(data, options );
  },

  returnKindle: function(event){
    var request = $.get(KindlesApp.ServerUrl + '/api/kindle_requests/return_kindle', { id: this.model.id });

    var redirect = this.model.get('status');

    request.success((function(_this) {
      return function(response) {
        if(response){
          $.jGrowl("Operation performed successfully", {
            position: 'center'
          });
          KindlesApp.Router.navigate('kindle-requests/' + redirect, { trigger: true });
        }
      };
    })(this));
  }
});

