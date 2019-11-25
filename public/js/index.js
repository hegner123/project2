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
          .attr("data-target", "#more-details-modal")
          .attr({
            id: book.title
          });


        $li.append($chkbutton);
        $li.append($detailbutton);

        return $li;
      });

      $("#result-list").empty();
      $("#result-list").append($bookList);
      $(".detailsBtn").on("click", bookDetailsApi);

      // if there's no match found in database, alert the user
      if ($bookList.length == 0) {
        $("#result-list").append("No match found");
      }
    });
  }

  // search button click
  $("#searchBtn").on("click", search);


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
            displayResults(response);
            var invisButton =  $("<button>")
          invisButton.attr("data-toggle", "modal");
          invisButton.attr("data-target", "#more-details-modal");
          invisButton.css('display', 'none');
          invisButton.appendTo("#books-output")
          invisButton.click();

        },
        error: function () {
          alert("Something went wrong! <br>" + "Try again!");
        }
      });
    }
  };

  function displayResults(response) {
      item = response.items[0];
      title1 = item.volumeInfo.title;
      author1 = item.volumeInfo.authors;
      publisher1 = item.volumeInfo.publisher;
      bookLink1 = item.volumeInfo.previewLink;
      bookIsbn1 = item.volumeInfo.industryIdentifiers[1].identifier
      bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

      outputList.innerHTML += `<div id="modal-show">` +
      formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn1) + 
      `</div>`

      function formatOutput(bookImg, title, author, publisher, description,  bookLink, bookIsbn) {
        var viewUrl = 'book.html?isbn='+bookIsbn;
        var htmlCard = `<div class="modal fade" id="more-details-modal" tabindex="-1" role="dialog" aria-labelledby="more-details-model" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                              <div class="modal-header bg-success">
                                <h3 class="modal-title text-white" id="more-details-modal-Title">More Details</h3>
                              </div>
                              <div class="modal-body">
                                <div class="row">
                                  <div class="col-md-12">
                                    <img src="${bookImg}" class="rounded mx-auto d-block" alt="Book Image">
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-12">
                                    <h4 class="text-black card-title text-center pt-3">${title}</h4>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-12">
                                    <p class="text-black card-text">Author: ${author}</p>
                                  </div>
                                </div>
                                  <p class="text-black card-text">Publisher: ${publisher}</p>
                                  <p class="text-black">Description: ${description}</p>
                                <div class="row">
                                  <div class="col-md-12 text-right">
                                    <a target="_blank" href="${viewUrl}" class="btn btn-success">Read Book</a>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>`
        return htmlCard;
      }
};

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
    $.post("/api/checkout", info, refreshCheckoutSection);
  };

  function refreshCheckoutSection() {
    $("#checkout-list").empty();
    var checkoutItem = $('<li class="list-group-item>');
    checkoutItem.text(btnValue + " due by " + formatDate);
    $checkoutArray.push(checkoutItem);
    console.log("arrray: " + $checkoutArray);

    $("#checkout-list").append($checkoutArray);

  };
  // checkout button click
  $("#result-list").on("click", ".chkoutBtn", checkOut);
});
