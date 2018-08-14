$(document).ready(function () {
    var giphyArray = ["dog", "cat", "hamster", "ferret", "Guinea Pig", "mouse", "horse", "piglet", "bird", "parrot", "gold fish", "turtle"];

    function renderButtons() {
        $("#buttons").empty();
        for (var i = 0; i < giphyArray.length; i++) {
            var giphyButton = $("<button class='btn btn-primary giphy-button'>");
            giphyButton.attr("data-animal", giphyArray[i]);
            giphyButton.text(giphyArray[i]);
            $("#buttons").append(giphyButton);
        }
    };
    renderButtons();

    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        giphyArray.push(animal);
        renderButtons();
    });

    $(document).on("click", ".giphy-button", function () {
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var giphyDiv = $("<div class='giphyDiv float-left'>");
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var giphyImage = $("<img>");

                        giphyImage.attr("src", results[i].images.fixed_height_still.url);
                        giphyImage.attr("data-still", results[i].images.fixed_height_still.url)
                        giphyImage.attr("data-animate", results[i].images.fixed_height.url)
                        giphyImage.attr("data-state", "still")
                        giphyDiv.append(giphyImage);
                        giphyDiv.append(p);

                        $("#giphyJoy").prepend(giphyDiv);
                    }
                }
            });
    });

    $(document).on("click", "img", function () {
        var state = this.dataset.state;

        if (state === "still") {
            $(this).attr("src", this.dataset.animate);
            $(this).attr("data-state", "animate");

        } else if (state === "animate") {
            $(this).attr("src", this.dataset.still);
            $(this).attr("data-state", "still");
        }
    });
});


