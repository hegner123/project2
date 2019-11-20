
$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("#create-account");
  var emailInput = $("#input-email");
  var passwordInput = $("#input-password");
  var firstNameInput = $("#input-first-name");
  var lastNameInput = $("#input-last-name");
  var inputAddress = $("#input-address");
  var inputCity = $("#input-city");
  var inputState = $("#input-state");
  var inputZip = $("#input-zip");
  $("#failed-login").hide();

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      address: inputAddress.val().trim(),
      city: inputCity.val().trim(),
      state: inputState.val().trim(),
      zip: inputZip.val().trim()
    };

    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName || !userData.lastName || !userData.address || !userData.city || !userData.state || !userData.zip) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.firstName, userData.lastName, userData.address, userData.city, userData.state, userData.zip );
    emailInput.val("");
    passwordInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    inputAddress.val("");
    inputCity.val("");
    inputState.val("");
    inputZip.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName, address, city, state, zip) {
    $.post("/api/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      state: state,
      zip: zip
    }).then(function(data) {
      window.location.href = '/';
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#banner").val("");
    $("#banner").text(err.responseJSON);
    $("#banner").fadeIn(500);
  }





  //LOGIN

  // Getting references to our form and inputs
  var loginForm = $("#login");
  var loginEmail = $("#login-email");
  var loginPassword = $("#login-password");
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: loginEmail.val().trim(),
      password: loginPassword.val().trim()
    };
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    loginEmail.val("");
    loginPassword.val("");
  });
  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.href = data;
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
      $("#failed-login").show();
    });
  }

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  

});
