$(function () {

  Handlebars.registerHelper("debugger", function(optionalValue) {
    console.log('values');
    console.log(this);
  });

  Handlebars.registerHelper("create-select", function() {
    var options = '';
    for (var i = 0, j = this.length; i < j; i++) {
      var kindle = this[i];
      options = options +( '<option value="' + kindle[0] + '">' + kindle[1] + '</option>');
    }
    return new Handlebars.SafeString(options);
  });

});

