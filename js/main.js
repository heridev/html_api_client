$(function () {

  Handlebars.registerHelper('fullName', function(person) {
    return person.firstName + " " + person.lastName;
  });

  var router = new Router();

  // Start history
  Backbone.history.start();
});
