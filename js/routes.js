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
    var data = {};
    $('.body_container').html('').loadFromTemplate({
      template : "test2",
      data : data,
      render_method: 'html',
      extension : ".html",
      path: 'templates/'
    });
  }

});
