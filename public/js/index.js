$(document).ready(function() {

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
            description1 = item.volumeInfo.description;
            bookLink1 = item.volumeInfo.previewLink;
            bookIsbn1 = item.volumeInfo.industryIdentifiers[1].identifier
            bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

            item2 = response.items[i+1];
            title2 = item2.volumeInfo.title;
            author2 = item2.volumeInfo.authors;
            publisher2 = item2.volumeInfo.publisher;
            description2 = item.volumeInfo.description;
            bookLink2 = item2.volumeInfo.previewLink;
            bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
            bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr;

            outputList.innerHTML += '<div class="row mt-4">' +
                                    formatOutput(bookImg1, title1, author1, publisher1, description1, bookLink1, bookIsbn1) +
                                    formatOutput(bookImg2, title2, author2, publisher2, description2, bookLink2, bookIsbn2)
                                    '</div>';

            console.log(outputList);

        }
    }
    function formatOutput(bookImg, title, author, publisher, description,  bookLink, bookIsbn) {
        var viewUrl = 'book.html?isbn='+bookIsbn;
        var htmlCard = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"              aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                              <div class="modal-header bg-success">
                                <h3 class="modal-title text-white" id="exampleModalCenterTitle">More Details</h3>
                              </div>
                              <div class="modal-body text-center">
                                <img src="${bookImg}" class="rounded" alt="Book Image">
                                <h5 class="text-black card-title text-center">${title}</h5>
                                <p class="text-black card-text">Author: ${author}</p>
                                <p class="text-black card-text">Publisher: ${publisher}</p>
                                <p class="text-black">Description: ${description}</p>
                                <a target="_blank" href="${viewUrl}" class="btn btn-success pull-right">Read Book</a>
                                <button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Close</
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



// End of book code

// Modal Pulling Book Review Information from Google Book API
