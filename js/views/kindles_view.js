var KindlesView = Backbone.View.extend({
  render: function(){
    this.$el.loadFromTemplate({
      template : "kindles",
      data : this.model,
      render_method: 'html',
      extension : ".html",
      path: 'templates/'
    });
  }
});

