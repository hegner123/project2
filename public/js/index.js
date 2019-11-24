$(document).ready(function () {

  // variables for google books api
  var item;
  var outputList = document.getElementById("books-output");
  var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var placeHldr = '<img src="https://via.placeholder.com/150">';
  var searchData;

  // Variable to hold search & result data
  var btnId;
  var btnValue;

  var qty = {};

  var currentDate;
  var dueDate;
  var formatDate;

  var info = {};
  var searchResult;
  var $checkoutArray = [];


  // Search button on click call search function
  var search = function (event) {
    event.preventDefault();
    var searchInput = $("#book_search").val().trim();

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

      // save the data to a variable
      searchResult = data;
      console.log(searchResult)

      // output the results to the index.handlebar page
      var $bookList = data.map(function (book) {
        var $a = $("<a>")
          .text(book.title + " by " + book.authors);

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
          .addClass("btn float-right bg-white mr-2 detailsBtn")
          .text("More Details")
          .attr("data-toggle", "modal")
          .attr("data-target", "#exampleModalCenter")
          .attr({
            id: book.title
          });


        $li.append($chkbutton);
        $li.append($detailbutton);

        return $li;
      });

      $("#result-list").empty();
      $("#result-list").append($bookList);

      // if there's no match found in database, alert the user
      if ($bookList.length == 0) {
        $("#result-list").append("No match found");
      }
    });
  }

  var bookDetailsApi = function () {
    event.preventDefault();
    outputList.innerHTML = "";
    document.body.style.backgroundImage = "url('')";
    searchData = $(this).attr("id");
    console.log("data: " + searchData);

    if (searchData === "" || searchData === null) {
      displayError();
    }
    else {
      $.ajax({
        url: bookUrl + searchData,
        dataType: "json",
        success: function (response) {
          console.log(response)
          if (response.totalItems === 0) {
            alert("This title is not in our library!");
          }
          else {
            $("title").animate({ 'margin-top': '5px' }, 1000);
            $(".book-list").css("visibility", "visible");
            displayResults(response);
          }
        },
        error: function () {
          alert("Something went wrong! <br>" + "Try again!");
        }
      });
    }


  };
  function displayResults(response) {
    for (var i = 0; i < response.items.length; i += 2) {
      item = response.items[i];
      title1 = item.volumeInfo.title;
      author1 = item.volumeInfo.authors;
      publisher1 = item.volumeInfo.publisher;
      bookLink1 = item.volumeInfo.previewLink;
      bookIsbn1 = item.volumeInfo.industryIdentifiers[1].identifier
      bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

      item2 = response.items[i + 1];
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


};

// End of preview code


  

  var checkOut = function () {
    console.log("btn works");
    btnId = $(this).attr("id");
    btnValue = $(this).attr("value");

    console.log("data id: " + btnId);
    console.log("btn value: " + btnValue);

    for (var i = 0; i < searchResult.length; i++) {
      if (btnId == searchResult[i].book_id && searchResult[i].qty_on_hand > 0) {
        console.log("enough in stock");
        qty = {
          new_qty_on_hand: (searchResult[i].qty_on_hand) - 1,
          new_qty_checkedout: (searchResult[i].qty_checked_out) + 1,
          book_id: btnId
        }
        currentDate = moment().format("YYYY-MM-DD");
        dueDate = moment().add(1, 'months');
        formatDate = dueDate.format("YYYY-MM-DD");

        info = {
          userId: 1,
          bookId: btnId,
          checkout_on: currentDate,
          return_by_date: formatDate
        };

        console.log(info);
        updateQty(qty);
        insertCheckout(info);
      }
      else {
        //modal
        console.log("not enough");
      }
    };


  };

  function updateQty(qty) {
    console.log("under update func: " + qty.book_id);
    $.ajax({
      method: "PUT",
      url: "/updateQty/" + qty.book_id,
      data: qty

    }).then(console.log("qty update successful"));
  }





  function insertCheckout(info) {
    console.log("ghjfkjdhfdkgljkh;");
    $.post("/api/checkout", info, refreshCheckoutSection);
  };

  function refreshCheckoutSection() {
    $("#checkout-list").empty();
    $checkoutArray.push(btnValue + " due by " + formatDate);
    console.log("arrray: " + $checkoutArray);

    
    $("#checkout-list").append($checkoutArray);

  };

  //All BUTTON CLICKS

  // search button click
  $("#searchBtn").on("click", search);

  // checkout button click
  $("#result-list").on("click", ".chkoutBtn", checkOut);

  // checkout button click
  //$("#result-list").on("click", ".chkoutBtn", checkOut);
  // $(".chkoutBtn").on("click", checkOut);

  // book details button click from search results
  $("#result-list").on("click", ".detailsBtn", bookDetailsApi);


});