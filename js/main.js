$(function () {

  Handlebars.registerHelper('fullName', function(person) {
    return person.firstName + " " + person.lastName;
  });

  var router = new Router();
  Backbone.history.start();
});
