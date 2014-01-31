window.KindlesApp = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {},
  Routers: {},
  init: function() {
    this.Router = new KindlesApp.Routers.Router();
    return Backbone.history.start();
  }
};

