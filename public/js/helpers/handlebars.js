$(function () {

  Handlebars.registerHelper("debugger", function(optionalValue) {
    console.log('values');
    console.log(this);
  });

  Handlebars.registerHelper("create-select", function() {
    if(_.isEmpty(this)){
      $('.assign-kindle').remove();
    }
    var options = '';
    for (var i = 0, j = this.length; i < j; i++) {
      var kindle = this[i];
      options = options +( '<option value="' + kindle[0] + '">' + kindle[1] + '</option>');
    }
    return new Handlebars.SafeString(options);
  });

  Handlebars.registerHelper("validate-buttons", function() {
    var options = ''

    if(this.status == 'in_progress'){
      options = options + '<button type="button" class="btn btn-primary assign-kindle">Assign</button>';
    }

    options = options + '<button type="button" class="btn btn-primary delete-kindle-request">Delete Request</button>';

    if(this.kindle_id && this.status != 'inactive'){
      options = options + '<button type="button" class="btn btn-primary return-kindle">Return Kindle</button>';
    }

    return new Handlebars.SafeString(options);
  });

});

