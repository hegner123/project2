$(document).ready(function(){
  $.get("/api/user").then(function(data) {
    console.log(data)
    $("#profile-email").text(data.email)
      $("#profile-name").text(data.name);
      $("#profile-address").text(data.address);
    });

  $("#logout").on("click", function (){
    window.location.href = "/logout";
  });

  $("#delete-btn").on("click", function(){
    $('#delete-modal').modal('show');
  });

  $("#delete-account").on("click", function (){
      var deleteEmail = $("#profile-email").text;
      console.log(deleteEmail);
      var deletePassword = $("#delete-password");
      event.preventDefault();
      var userData = {
        email: deleteEmail.val().trim(),
        password: deletePassword.val().trim()
      };
      if (!userData.email && !userData.password ) {
        return;
      }
      console.log(userData);
      // If we have an email & password we run the loginUser function and clear the form
      deleteUser(userData.email, userData.password);
      deletePassword.val("");

    function deleteUser(email, password) {
      $.post("/api/password", {
        email: email,
        password: password
      }).then(function(data) {
        console.log("pass")
        // deleteUserAccount(data);
        // If there's an error, log the error
      }).catch(function(err) {
        console.log(err);
        console.log("fail")
      });
    };

    function deleteUserAccount(){
      $.delete("/api/delete-profile/" + email),{

      }
    }
  })








});