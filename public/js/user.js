$(document).ready(function(){
  $.get("/api/user").then(function(data) {
    console.log(data)
      $("#profile-email").text(data.email);
      $("#profile-name").text(data.name);
      $("#profile-address").text(data.address);
      var bookData = data.checkoutData
      var checkoutArea = $("#checked-out-books");
      var item = $('<div class="col-12">');
      var bookImg = $('<img src="">');
      var bookTitle = $("<h6>");
      var returnText = $('<p class="text-bold">');
      item.appendTo(checkoutArea);
      bookTitle.text(bookData.title);
      bookTitle.appendTo(item);
      bookImg.attr("src", bookData.small_image_url);
      bookImg.appendTo(bookTitle);
      returnText.text("Return By: " + data.dueDate.replace("T00:00:00.000Z", ""));
      returnText.appendTo(bookTitle);

    });

  $("#logout").on("click", function (){
    window.location.href = "/logout";
  });

  $("#delete-btn").on("click", function(){
    $('#delete-modal').modal('show');
  });

  $("#delete-account").on("click", function (){
    var deleteEmail = $("#profile-email").text();
    deleteAccount(deleteEmail);
  });

  function deleteAccount(email){
    $.ajax({
      method: "DELETE",
      url: "/api/user/delete/" + email
    }).then(function(data){
      window.location.href = "/logout";
    });
  };












});