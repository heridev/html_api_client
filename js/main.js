$(function () {
  $.ajaxSetup({
    'beforeSend': function(xhr) {
      var token = $("meta[name='user-token']").attr("content");
      xhr.setRequestHeader("userToken", token);
      xhr.setRequestHeader("accept", "application/json");
    }
  });

  KindlesApp.init();
});

$( document ).ajaxError(function(e, jqxhr) {
  if (jqxhr.status === 401 || jqxhr.status === 403) {
    KindlesApp.Router.navigate('', { trigger: true});
  };
});

