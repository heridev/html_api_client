$(function () {

  Handlebars.registerHelper("debugger", function(optionalValue) {
    console.log('values');
    console.log(this);
  });

});

