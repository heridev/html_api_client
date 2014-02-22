window.Mixins = {};
Mixins.HandleErrors = {
  displayErrors: function(response) {
    var attribute, errors, field, messages;
    if (response.status === 422) {
      errors = $.parseJSON(response.responseText).errors;
      _.each(errors, function (error, field) {
        var inputField = this.$("input[name='" + field + "']").parent();
        inputField.addClass('has-error');

        _.each(error, function (errorMessage) {
          var formatedError = '<p class="text-danger"><strong>' + field +  ':</strong> ' + errorMessage + '</p>';
          this.$('.error-area').append(formatedError);
        }, this);

      }, this);
    }
  }
}

