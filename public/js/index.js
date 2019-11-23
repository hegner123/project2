
google.books.setOnLoadCallback(initialize);
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


  // Beginning of book preview code

  $(document).ready(function() {
    var item
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q="
    var placeHldr = '<img src="https://via.placeholder.com/150">'
    var searchData;

    $("#search").click(function() {
      event.preventDefault();
        outputList.innerHTML = "";
        document.body.style.backgroundImage = "url('')";
        searchData = $("#search-box").val();

        if(searchData === "" || searchData === null) {
            displayError();
        }
        else {
            $.ajax({
                url: bookUrl + searchData,
                dataType: "json",
                success: function(response) {
                    console.log(response)
                    if(response.totalItems === 0) {
                        alert("This title is not in our library!");
                    }
                    else {
                        $("title").animate({'margin-top': '5px'}, 1000);
                        $(".book-list").css("visibility", "visible");
                        displayResults(response);
                    }
                },
                error: function() {
                    alert("Something went wrong! <br>"+"Try again!");
                }
            });
        }
        $("#search-box").val("");
    });

    function displayResults(response) {
        for(var i = 0; i < response.items.length; i+=2) {
            item = response.items[i];
            title1 = item.volumeInfo.title;
            author1 = item.volumeInfo.authors;
            publisher1 = item.volumeInfo.publisher;
            bookLink1 = item.volumeInfo.previewLink;
            bookIsbn1 = item.volumeInfo.industryIdentifiers[1].identifier
            bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

            item2 = response.items[i+1];
            title2 = item2.volumeInfo.title;
            author2 = item2.volumeInfo.authors;
            publisher2 = item2.volumeInfo.publisher;
            bookLink2 = item2.volumeInfo.previewLink;
            bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
            bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr;

            outputList.innerHTML += '<div class="row mt-4">' +
                                    formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn1) +
                                    formatOutput(bookImg2, title2, author2, publisher2, bookLink2, bookIsbn2)
                                    '</div>';

            console.log(outputList);

        }
    }
    function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
        var viewUrl = 'book.html?isbn='+bookIsbn;
        var htmlCard = `<div class="col-lg-6">
                            <div class="card" style="">
                                <div class="row no-gutters">
                                    <div class="col-md-4">
                                        <img src="${bookImg}" class="card-img" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body bg-secondary">
                                            <h5 class="text-white card-title">${title}</h5>
                                            <p class="text-white card-text">Author: ${author}</p>
                                            <p class="text-white card-text">Publisher: ${publisher}</p>
                                            <a target="_blank" href="${viewUrl}" class="btn btn-dark">Read Book</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
        return htmlCard;                                      
    }

  
});

// End of preview code 


// Beginning of book code

google.books.load();

function initialize() {

  var viewer = new google.books.DefaultViewer(document.getElementById('display'));
  var index = document.URL.indexOf('?');
  if(index > 0) {
    var bookIsbn = document.URL.substring(index, document.URL.length).split("=")[1];
  }
  viewer.load('ISBN:'+bookIsbn);
}

google.books.setOnLoadCallback(initialize);

// End of book code