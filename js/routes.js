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
        var kindlesView = new KindlesView({ model: response, el: $('.body_container') });
        kindlesView.render()
      },
      error: function(){
        alert('a ocurrido un error favor de intentarlo mas tarde...');
      }
    });
  }

});
