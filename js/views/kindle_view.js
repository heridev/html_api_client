var KindleView = Backbone.View.extend({
  initialize: function(){
    this.render()
  },

  render: function() {
    this.$el.loadFromTemplate({
      template : "kindle_details",
      data : this.model,
      extension : ".html",
      path: 'templates/'
    });
  }

});
