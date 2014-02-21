KindlesApp.Views.kindlesView = Backbone.View.extend({

  initialize: function(options) {
    this.template = options.template;
    this.type = options.type;
    this.collectionSource = options.collectionSource || new KindlesCollection();
    this.pageInfo = options.pageInfo;
    var _this = this;
    $(window).bind('scroll', function (ev) {
      _this.checkScroll();
    });
    this.collectionSource.on ('change',this.render.bind (this));
  },

  events: {
    "click #load-more-kindles"  : "loadMoreKindles",
    "click .remove-kindle"      : "removeKindle"
  },

  checkScroll: function(){
    var isLastPage = this.IsTheLastPage();
    var windowValue = ($(window).innerHeight() + $(window).scrollTop());
    if( windowValue >= $('body').height() && !isLastPage){
      this.getMoreKindles();
    };
  },

  removeKindle: function(event){
    event.preventDefault();
    var element = this.$(event.currentTarget).closest( "div" )
    kindle = this.setKindle(element);
    var _this = this;

    if (confirm('Está seguro de que desea eliminar este kindle?')) {
      kindle.destroy({
        success: function(model, response) {
          _this.syncCurrentPagesContent();
          element.remove();
        },
        error: function(model, response) {
          alert('ocurrio un error al momento de eliminar');
        }
      });
    }
  },

  setKindle: function(element){
    var kindleId = element.attr('id');

    return new KindleModel({
      id: kindleId
    });
  },

  syncCurrentPagesContent: function(){
    var current_page = this.pageInfo['current_page'];
    this.$el.find('#kindles-list').html('');
    for (var i = 0, j = current_page; i < j; i++) {
      this.pageInfo['current_page'] = i;
      this.getMoreKindles();
    }
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
      data: { page: next_page, type: this.type },
      success : function (data, response, jqXHR) {
        _this.pageInfo['current_page'] = response.current_page;
        _this.pageInfo['total_pages'] = response.total_pages;
        _this.reducePageIfModelsEmpty(response);
        _this.addAllKindles(response.models);
      },
      error: function(){
        alert('a ocurrido un error favor de intentarlo mas tarde...');
      },
      async: false
    });
  },

  reducePageIfModelsEmpty: function(response){
    if(_.isEmpty(response.models)){
      this.pageInfo['current_page'] = response.current_page - 1;
    }
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

