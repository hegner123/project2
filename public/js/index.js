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
