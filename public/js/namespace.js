window.KindlesApp = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {},
  Routers: {},
  UserToken: null,
  //the follow credential are for production hosted in herokuapp
  ServerUrl: 'http://publicrailsapi.herokuapp.com',
  GoogleRedirect: 'http://kindles.herokuapp.com',
  Client_id: '743334908352-l0012lk0k79bgk6dllh4g78tmho6sfl8.apps.googleusercontent.com',
  //the follow credential are for local development environment
  //ServerUrl: 'http://localhost:3000',
  //GoogleRedirect: 'http://localhost:9292',
  //Client_id: '743334908352-2dlju9l02d56ajc3qad6vti0rq23urb2.apps.googleusercontent.com',
  init: function() {
    this.Router = new KindlesApp.Routers.Router();
    return Backbone.history.start();
  }
};

