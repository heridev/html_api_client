KindlesApp.Views.kindlesView = Backbone.View.extend({

  initialize: function(options) {
    this.template = options.template;
    this.collectionSource = options.collectionSource || new KindlesCollection();
    this.pageInfo = options.pageInfo;
    var _this = this;
    $(window).bind('scroll', function (ev) {
      _this.checkScroll();
    });
  },

  events: {
    "click #load-more-kindles"  : "loadMoreKindles"
  },

  checkScroll: function(){
    var isLastPage = this.IsTheLastPage();
    var windowValue = ($(window).innerHeight() + $(window).scrollTop());
    if( windowValue >= $('body').height() && !isLastPage){
      this.getMoreKindles();
    };
  },

  render: function(){
    this.loadTemplate();
    this.addAllKindles(this.collection);
    return this;
  },

  loadTemplate: function(){
    var _this = this;
    this.$el.loadFromTemplate({
      template : 'kindles',
      data : { current_page: _this.pageInfo['current_page'] },
      render_method: _this.pageInfo['renderMethod'],
      extension : ".html",
      async_mode: false,
      path: 'templates/'
    });
  },

  loadMoreKindles: function(event){
    event.preventDefault();
    this.getMoreKindles();
  },

  getMoreKindles: function(){
    var next_page = this.pageInfo['current_page'] + 1;
    var _this = this;
    kindles = this.collectionSource;
    kindles.fetch({
      data: { page: next_page },
      success : function (data, response, jqXHR) {
        _this.pageInfo['current_page'] = response.current_page;
        _this.pageInfo['total_pages'] = response.total_pages;
        _this.addAllKindles(response.models);
      },
      error: function(){
        alert('a ocurrido un error favor de intentarlo mas tarde...');
      },
      async: false
    });
  },

  IsTheLastPage: function(){
    var lastPageCondition = this.pageInfo['total_pages'] <= this.pageInfo['current_page'];
    var result = (lastPageCondition || false);
    return result;
  },

  addAllKindles: function(models){
    var _this = this;
    _.each(models, function (kindle, index) {
      var currentView = new KindleView( { model: kindle, template: _this.template } )
      _this.$el.find('#kindles-list').append(currentView.render().el)
    });
    if(this.IsTheLastPage()){ this.$('#load-more-kindles').remove(); }
  }
});

