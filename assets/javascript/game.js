$(document).ready(function () {

    var topics = ["The Shining", "Empire Strikes Back", "Bladerunner 2049", "Black Panther", "lord of the Rings", "The Matrix", "Ninja Scroll", "Ghost in A Shell"];

    function displayInfo() {
        var movie = $(this).attr("movie-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
// could not get the empty to work. 
            $("#movie").empty();

            var results = response.data;


            for (var i = 0; i < results.length; i++) {
                var movieDiv = $("<div class='userMovie'>");

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);
                var genre = $("<p>").text("Genre: " + genre);


                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;


                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");


                movieDiv.append(gif);
                movieDiv.append(pRate);
                movieDiv.append(genre);


                $("#movies").append(movieDiv);
            }


            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }

    function renderButtons() {
        $("#movieButtons").empty();
        
        for (var i = 0; i < topics.length; i++) {
            var movieRender = $("<button>");

            movieRender.addClass("movie");
            movieRender.attr("movie-name", topics[i]);
            movieRender.text(topics[i]);
            $("#movieButtons").append(movieRender);
        }
    }


    $("#addMovie").on("click", function (event) {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();

        topics.push(movie);
        $("#movie-input").val(" ");
        renderButtons();
    });

    $(document).on("click", ".movie", displayInfo);

    renderButtons();
});
