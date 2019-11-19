

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function (user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(user)
    });
  },

  loginUser: function (user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/auth",
      data:JSON.stringify(user)
    });
  },
  getLogin: function() {
    return $.ajax({
      url: "api/login",
      type: "GET"
    });
  },

};

var refreshLogin = function() {
  API.getLogin().then(function(data) {
    var confirm = $("<div>");
    confirm.text(data);
    confirm.appendTo(".confirm-box");
}
)};

// Add event listeners to the user signup submit buttons

var handleSignUp = function (event) {
  event.preventDefault();
  var user = {
    email: $("#inputEmail").val().trim(),
    userPassword: $("#inputPassword").val().trim(),
    firstName: $("#inputFirstName").val().trim(),
    lastName: $("#inputLastName").val().trim(),
    address: $("#inputAddress").val().trim(),
    city: $("#inputCity").val().trim(),
    state: $("#inputState").val().trim(),
    zip: $("#inputZip").val().trim(),
  };

  API.saveUser(user).then(function() {
    console.log("it's working");
  });
};

var handleLogin = function (event) {
  event.preventDefault();
  var userLogin = {
    email: $("#loginEmail").val().trim(),
    userPassword: $("#loginPassword").val().trim(),
  };

  API.loginUser(userLogin).then(function() {
    console.log("it's working");
    refreshLogin();
  });
};

$("#login-btn").on("click", handleLogin);
$("#signupBtn").on("click", handleSignUp);


