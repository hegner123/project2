$(document).ready(function(){
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

    // Variable to hold search result data
    var searchResult;

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
        if (data ==="/login"){
          window.location.href = data;
        } else {
          var errorData = data.errors[0].message;
          $("#error-area").text(errorData);
          $("#error-area").css({"text-transform": "capitalize"}
          )}
      }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
      console.log(err)

    }

});