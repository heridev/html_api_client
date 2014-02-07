window.KindlesApp = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {},
  Routers: {},
  UserToken: null,
  ServerUrl: 'http://localhost:3000',
  init: function() {
    this.Router = new KindlesApp.Routers.Router();
    return Backbone.history.start();
  }
};

