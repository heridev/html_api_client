window.KindlesApp = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {},
  Routers: {},
  UserToken: null,
  ServerUrl: 'http://publicrailsapi.herokuapp.com',
  GoogleRedirect: 'http://kindles.herokuapp.com',
  init: function() {
    this.Router = new KindlesApp.Routers.Router();
    return Backbone.history.start();
  }
};

