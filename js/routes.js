KindlesApp.Routers.Router = Backbone.Router.extend({

  routes: {
    ""                           : "login",
    "kindles"                    : "manageKindles",
    "kindle-requests"            : "manageKindleRequests",
    "kindle-requests/show/:id"   : "showKindleRequest",
    "add-kindle"                 : "addKindle",
    "logout"                     : "logOut",
    "restricted-area"            : "restrictedArea",
    "add-kindle-request"         : "addKindleRequest",
    "*path"                      : "authenticateUser",
  },

  login: function(){
    this.addUserToken();
    this.renderPage(new KindlesApp.Views.LoginView);
  },

  logOut: function(){
    var userLogOut = KindlesApp.ServerUrl + '/api/sessions/destroy?access_token=';
    var user_token = KindlesApp.UserToken || $.cookie('UserToken')
    $.ajax({
      url: userLogOut + user_token,
      success: function(resp) {
        KindlesApp.UserToken = '';
        $.removeCookie('UserToken');
        $('#main-menu').html('');
        KindlesApp.Router.navigate('', { trigger: true});
      }
    });
  },

  authenticateUser: function(){
    var url =   window.document.URL;
    var acToken =   this.getTokensFromUrl(url, 'access_token');
    this.validateToken(acToken);
  },

  validateToken: function(access_token){
    var _this = this;
    var userAuthUrl = KindlesApp.ServerUrl + '/api/sessions/create?access_token=';
    $.ajax({
      url: userAuthUrl + access_token,
      success: function(user, status) {
        _this.successResponse(user, access_token);
      },
      error: function(){
        alert('La cuenta que utilizaste no es valida para iniciar sesion..');
        KindlesApp.Router.navigate('', { trigger: true});
      }
    });
  },

  successResponse: function(user, access_token){
    KindlesApp.UserToken = access_token;
    KindlesApp.UserRole = user.role;
    $.cookie('UserRole', user.role, { expires: 1 });
    $.cookie('UserToken', access_token, { expires: 1 });
    this.loadLayoutOptions(user.role);
    if(user.role == 'admin'){
      KindlesApp.Router.navigate('kindles', { trigger: true});
    }
    if(user.role == 'requester'){
      KindlesApp.Router.navigate('add-kindle-request', { trigger: true});
    }
  },

  loadLayoutOptions: function(role){
    var template = (role + '_menu') || 'requester_menu';
    $('#main-menu').loadFromTemplate({
      template : template,
      extension : ".html",
      render_method: 'html',
      data: {},
      path: 'templates/',
    });
  },

  getTokensFromUrl: function( url, name ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\#&]" + name + "=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return ( results == null &&  "" ) || (results && results[1]);
  },

  manageKindles: function() {
    this.addUserToken();
    var _this = this;
    kindles = new KindlesCollection();
    kindles.fetch({
      data: { page: 1 },
      success : function (data, response, jqXHR) {
        pageInfo = {
          renderMethod: 'html',
          current_page: response.current_page,
          perPage: response.perPage,
          total_pages: response.total_pages
        }
        var currentView = new KindlesApp.Views.kindlesView({
          pageInfo: pageInfo,
          collection: response.models
        });
        _this.renderPage(currentView);
      }

    });
  },

  addKindle: function(){
    this.addUserToken();
    this.renderPage(new addKindleView());
  },

  renderPage: function(view) {
    $('#render-content').empty().html(view.render().el);
  },

  addUserToken: function(){
    var userRole = (KindlesApp.UserRole || $.cookie('UserRole'));
    var userToken = (KindlesApp.UserToken || $.cookie('UserToken') || 'invalid-token');
    if(($("meta[name='user-token']").length == 0) && (userToken != 'invalid-token')) {
      KindlesApp.UserToken = userToken;
      this.loadLayoutOptions(userRole);
      var metaTag = '<meta http-equiv="X-UA-Compatible" content="' + userToken + '" name="user-token"/> ';
      $('head').append(metaTag);
    }
  },

  restrictedArea: function(){
    this.addUserToken();
    $('#render-content').loadFromTemplate({
      template : 'restricted',
      extension : ".html",
      render_method: 'html',
      data: {},
      path: 'templates/',
    });
  },

  addKindleRequest: function(){
    this.addUserToken();
    this.renderPage(new KindlesApp.Views.AddKindleRequestView());
  },

  manageKindleRequests: function() {
    this.addUserToken();
    var _this = this;
    kindles_requests = new KindlesApp.Collections.KindleRequestsCollection();
    kindles_requests.fetch({
      data: { page: 1 },
      success : function (data, response, jqXHR) {
        pageInfo = {
          renderMethod: 'html',
          current_page: response.current_page,
          perPage: response.perPage,
          total_pages: response.total_pages
        }
        var currentView = new KindlesApp.Views.kindlesView({
          pageInfo: pageInfo,
          collection: response.models,
          collectionSource: new KindlesApp.Collections.KindleRequestsCollection(),
          template: 'kindle_requests_details'
        });
        _this.renderPage(currentView);
      }

    });
  },

  showKindleRequest: function(id){
    this.addUserToken();
    var _this = this;
    var kindle = new KindlesApp.Models.KindleRequestModel({
      id: id
    });
    kindle.fetch({
      success: function() {
        _this.renderPage(new KindlesApp.Views.KindleRequestShowView({ model: kindle }));
      }
    });
  }
});

