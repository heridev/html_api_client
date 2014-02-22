var OAUTHURL    =   'https://accounts.google.com/o/oauth2/auth?';
var VALIDURL    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
var SCOPE       =   'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
var TYPE        =   'token';
var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + KindlesApp.Client_id + '&redirect_uri=' + KindlesApp.GoogleRedirect + '&response_type=' + TYPE;
var acToken;

KindlesApp.Views.LoginView = Backbone.View.extend({

  events: {
    'click #login'  :  'loginMethod'
  },

  render: function() {
    var _this = this;
    this.$el.loadFromTemplate({
      template : 'login',
      render_method: 'html',
      extension : ".html",
      data: {},
      path: 'templates/',
    });
    return this;
  },

  loginMethod: function(){
    window.location = _url;
  }
});

