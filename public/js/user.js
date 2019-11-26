$(document).ready(function(){



  $.get("/api/user").then(function(data) {
    console.log(data)
    $("#profile-email").text(data.email)
      $("#profile-name").text(data.name);
      $("#profile-address").text(data.address);

      userId = data.id;
      console.log("user id from table: " + userId);
     
      
    });

  $("#logout").on("click", function (){
    window.location.href = "/logout";
  });

  $("#delete-btn").on("click", function(){
    $('#delete-modal').modal('show');
  });

  $("#delete-account").on("click", function (){
    var deleteEmail = $("#profile-email").text();
    deleteAccount(deleteEmail);
  });

  function deleteAccount(email){
    $.ajax({
      method: "DELETE",
      url: "/api/user/delete/" + email
    }).then(function(data){
      window.location.href = "/logout";
    });
  };












});