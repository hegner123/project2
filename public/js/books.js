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
                            
                              <div class="card-body bg-white">
                                  <h3 class="text-black card-title text-center">${title}</h3>
                                  <p class="text-black card-text">Author: ${author}</p>
                                  <p class="text-black card-text">Publisher: ${publisher}</p>  
                              </div>
                            
                              <div class="modal-footer">
                                <a target="_blank" href="${viewUrl}" class="btn btn-success">Read Book</a>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                              </div>
                            </div>
                            
                          </div>
                      </div>`
      return htmlCard;









  }


});



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
