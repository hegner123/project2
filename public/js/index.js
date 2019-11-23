
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
              class: "list-group-item bg-secondary",
              "data-id": book.book_id
            })
            .append($a);
  
          var $chkbutton = $("<button>")
            .addClass("btn float-right chkoutBtn bg-white")
            .text("Checkout")
            .attr({
              value: book.title,
              id: book.book_id
            });
          var $detailbutton = $("<button>")
            .addClass("btn float-right bg-white mr-2")
            .text("More Details")
            .attr("data-toggle","modal")
            .attr("data-target","#exampleModalCenter")
  
  
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
          var qty = {
            new_qty_on_hand: (searchResult[i].qty_on_hand)-1,
            new_qty_checkedout: (searchResult[i].qty_checked_out)+1,
            book_id: btnId
          }
          updateQty(qty);
        }
        else{
          //Pop up message with not available right now
        }
      }
    };

    function updateQty(qty) {
      console.log("under update func: " + qty.book_id);
      $.ajax({
        method: "PUT",
        url: "/updateQty/" + qty.book_id,
        data: qty

      }).then(console.log("qty update successful"));
    }

    // search button click
    $("#searchBtn").on("click", search);
   
    // checkout button click
    $("#result-list").on("click", ".chkoutBtn", checkOut);


});


  // Beginning of book preview code

  $(document).ready(function() {
    var item
    var outputList = document.getElementById("books-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q="
    var placeHldr = '<img src="https://via.placeholder.com/150">'
    var searchData;

    $("#searchBtn").click(function() {
      event.preventDefault();
        outputList.innerHTML = "";
        document.body.style.backgroundImage = "url('')";
        searchData = $("#book_search").val();

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
        $("#book_search").val("");
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
        var htmlCard = ` <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
               <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">${title}</h5>
                       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                         </button>
          
                       </div>
                             <div class="modal-body">

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
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                  </div>
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

// Modal Pulling Book Review Information from Google Book API
