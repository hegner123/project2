$(document).ready(function(){
  $.get("/api/user").then(function(data) {
    $("#welcome-banner").text(data.email);
  });

})

