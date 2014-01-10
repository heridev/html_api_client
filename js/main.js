$(function () {
  //var source = $("#test_template").html();
  //var template = Handlebars.compile(source);
  var data = {
    users: [ {
        person: {
            firstName: "Garry",
            lastName: "Finch"
        },
        jobTitle: "Front End Technical Lead",
        twitter: "gazraa"
    }, {
        person: {
            firstName: "Garry",
            lastName: "Finch"
        },
        jobTitle: "Photographer",
        twitter: "photobasics"
    }, {
        person: {
            firstName: "Garry",
            lastName: "Finch"
        },
        jobTitle: "LEGO Geek",
        twitter: "minifigures"
    } ]
  };
  Handlebars.registerHelper('fullName', function(person) {
    return person.firstName + " " + person.lastName;
  });

  //$('.body_container').append(template(data));
  $('.body_container').html('').loadFromTemplate({
    template : "test2",
    data : data,
    render_method: 'html',
    extension : ".html",
    path: 'templates/'
  });
});
