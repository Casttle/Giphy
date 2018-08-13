var giphyArray = ["dog", "cat", "hamster"];



function renderButtons() {
    $("#buttons").empty();
for (var i = 0; i < giphyArray.length; i++) {
    var giphyButton = $("<button class='btn btn-primary giphy-button'>");
    // giphyButton.addClass("giphy-button");
    giphyButton.attr("data-animal", giphyArray[i]);
    giphyButton.text(giphyArray[i]);
    $("#buttons").append(giphyButton);
}
};
renderButtons();

$("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var animal = $("#animal-input").val().trim();

    // The movie from the textbox is then added to our array
    giphyArray.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

$(document).on("click", ".giphy-button", function () {
    // In this case, the "this" keyword refers to the button that was clicked
    var animal = $(this).attr("data-animal");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            console.log(response);
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    var giphyDiv = $("<div class='giphyDiv float-left'>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var giphyImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    giphyImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    giphyDiv.append(p);
                    giphyDiv.append(giphyImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#giphyJoy").prepend(giphyDiv);
                }
            }
        });
});

