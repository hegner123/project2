
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
  var loginBtn = $("#login-btn")
  var loginEmail = $("#login-email");
  var loginPassword = $("#login-password");
  // When the form is submitted, we validate there's an email and password entered
  loginBtn.on("click", function(event) {
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

    // Search button on click call search function
    var search = function (event) {
      event.preventDefault();
      var searchInput = $("#book_search").val().trim();

      // take user input and call function to get query result
      getSearch(searchInput);
    }

    // function to get database result
    function getSearch(param1) {
      var id = param1;
      console.log("id: " + param1);
      $.ajax({
        method: "GET",
        url: "/search/" + id
      }).then(function (data) {

        //var x = data.map(v => v.title + " by " + v.authors);
        //console.log(x[0]);

        // save the data to a variable
        searchResult=data;
        console.log(searchResult)

        // output the results to the index.handlebar page
        var $bookList = data.map(function (book) {
          
          var $a = $("<a>")
            .text(book.title + " by " + book.authors);
          //.attr("href", "/example/" + example.id);
  
          var $li = $("<li>")
            .attr({
              class: "list-group-item",
              "data-id": book.book_id
            })
            .append($a);
  
          var $chkbutton = $("<button>")
            .addClass("btn float-right chkoutBtn")
            .text("Checkout")
            .attr({
              value: book.title,
              id: book.book_id
            });
          var $detailbutton = $("<button>")
            .addClass("btn float-right ")
            .text("More Details")
  
  
          $li.append($chkbutton);
          $li.append($detailbutton);
  
          return $li;
        });

        $("#result-list").empty();
        $("#result-list").append($bookList);
  
        // if there's no match found in database, alert the user
        if($bookList.length == 0) {
          $("#result-list").append("No match found");
        }
        
  
      });
    }
  
    var checkOut = function() {
      console.log("btn works");
      var btnId = $(this).attr("id");
      var btnValue = $(this).attr("value");
      
      console.log("data id: " + btnId);
      console.log("btn value: " + btnValue);
  
      for(var i=0; i< searchResult.length; i++) {
        if(btnId == searchResult[i].book_id && searchResult[i].qty_on_hand>0) {
          console.log("enough in stock");
        }
        else{
          //Pop up message with not available right now
        }
      }
    };
  
    // search button click
    $("#searchBtn").on("click", search);
   
    // checkout button click
    $("#result-list").on("click", ".chkoutBtn", checkOut);


});
