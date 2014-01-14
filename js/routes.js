var Router = Backbone.Router.extend({

  routes: {
    ""                 : "home",
    "categories"       : "categories",
    "search"           : "search",
    "post/:id"         : "postDetails",
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
    kindles = new KindlesCollection();
    kindles.fetch({
      dataType: 'jsonp',
      data: { page: 1 },
      success : function (data, response, jqXHR) {
        pageInfo = { renderMethod: 'html', current_page: response.current_page, perPage: response.perPage, total_pages: response.total_pages }
        var kindlesView = new KindlesView({ pageInfo: pageInfo, collection: response.models, el: $('#render-content') });
        kindlesView.render();
      },
      error: function(){
        alert('a ocurrido un error favor de intentarlo mas tarde...');
      }
    });
  }

});
