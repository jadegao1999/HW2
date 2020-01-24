// key: FnD79ZS0F7yBxwM6CYaKqw
// secret: 2L0J15ybdugtpLV44xXJnOt8x4bm1ZRduuWMfFFpzo
var KEY = "FnD79ZS0F7yBxwM6CYaKqw";
var SECRET = "2L0J15ybdugtpLV44xXJnOt8x4bm1ZRduuWMfFFpzo";
var ERROR_MESSAGE = "No Results.";

function onSearch() {
    var text = document.getElementById('text').value;

    findBooksByTitle(text, (books) => {
        if (books.length == 0) {
            document.getElementById("error-message")
                    .innerText = ERROR_MESSAGE;
        } else {
            // console.log("books: " +  books[0].getElementsByTagName("id")[0].childNodes[0].nodeValue);
            document.getElementById("error-message").innerText = "";
            getReviewsByBookId(
                    books[0].getElementsByTagName("id")[0].childNodes[0].nodeValue, (reviews_widget) => {
                        document.getElementById("review-table").innerHTML = reviews_widget;
                    });
        }
    })
}

function getReviewsByBookId(bookId, callback) {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/show.xml",
        type: "get",
        data: { 
            "key": KEY, 
            "id": bookId, 
        },
        success: function(response) {
            var reviews_widget = response.getElementsByTagName("reviews_widget")[0].childNodes[0].wholeText;
            console.log(reviews_widget);
            callback(reviews_widget);
        },
        error: function(xhr) {
            console.log("Error on getReviewsByBookId: " + xhr.responseText);
        }
    });
}

function findBooksByTitle(text, callback) {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml",
        type: "get",
        data: { 
            "q": text,
            "key": KEY,
        },
        success: function(response) {
            console.log(response);
            var books = response.getElementsByTagName("best_book");
            callback(books);
        },
        error: function(xhr) {
            console.log("Error on findBookByTitle: " + xhr.responseText);
        }
    });
}