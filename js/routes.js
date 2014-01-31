KindlesApp.Routers.Router = Backbone.Router.extend({

  routes: {
    ""                 : "home",
    "categories"       : "categories",
    "add-kindle"       : "addKindle",
    "*path"            : "home",
  },

  categories: function() {
    alert('escoge tu categoria');
  },

  search: function() {
    alert('vamos a buscar ');
  },

  postDetails: function(id) {
    alert('vamos a mostrar la noticiaa ' + id);
  },

  home: function() {
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
        var currentView = new kindlesView({
          pageInfo: pageInfo,
          collection: response.models
        });
        _this.renderPage(currentView);
      },
      error: function(){
        alert('a ocurrido un error favor de intentarlo mas tarde...');
      }
    });
  },

  addKindle: function(){
    this.renderPage(new addKindleView());
  },

  renderPage: function(view) {
    $('#render-content').empty().html(view.render().el);
  }
});
