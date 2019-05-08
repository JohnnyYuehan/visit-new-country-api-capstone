////////////////////////////////////////////////////////
////// functions definitions ///////////////////////
////////////////////////////////////////////////////////


//Step 2a - get data from Wikipedia
function getDataFromWikipedia(queryTarget) {

    // encodeURIComponent() Function This function encodes special characters. In addition, it encodes the following characters: , / ? : @ & = + $ #
    // https://www.w3schools.com/jsref/jsref_encodeURIComponent.asp
    var result = $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts&generator=search&plimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrlimit=10&callback=?&gsrsearch=" + encodeURIComponent(queryTarget),
        type: "GET",
        dataType: 'jsonp'
    })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            console.log(result);
            displayWikipediaSearchData(result)
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};


//Step 3a - show results from Wikipedia
function displayWikipediaSearchData(data) {

    //Step 3a - console.log the results
    console.log(data.query.pages);

    //create an empty variable to store one LI for each one the results
    var buildTheHtmlOutput = "";

    $.each(data.query.pages, function (arrayKey, arrayValue) {
        //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
        //buildTheHtmlOutput += "<img src='" + arrayValue.pageimage + "'/>"; buildTheHtmlOutput += "<p>" + arrayValue.title + "</p>";
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<p>" + arrayValue.title + "</p>"; //output vide title
        buildTheHtmlOutput += "<p>" + arrayValue.extract + "</p>";
        buildTheHtmlOutput += "</li>";
    });
     $('.info-box ul').html(buildTheHtmlOutput);

    //  $.each(data.query.pages, function (arrayKey, arrayValue) {
    //     buildTheHtmlOutput += "<li>";
    //     buildTheHtmlOutput += "<img src='" + arrayValue.pageimage + "'/>"; 
    //     buildTheHtmlOutput += "<p>" + arrayValue.title + "</p>"; 
    //     buildTheHtmlOutput += "</li>";
    // });
    //  $('.country-flag-box ul').html(buildTheHtmlOutput);
}


//Step 2b - get data from Youtube
function getDataFromYoutube(userSearchTerm) {
    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
        part: "snippet", //Youtube API special parameter (please check documentation here https://developers.google.com/youtube/v3/docs/search/list)
        maxResults: 20, //number of results per page
        key: "AIzaSyCclIq-RF7zhCJ_JnoXJBLdGvz-v2nzCB0",
        q: userSearchTerm, //shearch query from the user
        type: "video" //only return videos (no channels or playlists) so we can take the video ID and link it back to Youtube
    },
        function (receivedApiData) {
            //show the json array received from the API call
            console.log(receivedApiData);
            // if there are no results it will show an error
            if (receivedApiData.pageInfo.totalResults == 0) {
                alert("No videos found!");
            }
            //if there are results, call the displaySearchResults
            else {
                displayYoutubeSearchData(receivedApiData.items);
            }
        });
}


//Step 3b - show resutls from Youtube
function displayYoutubeSearchData(videosArray) {

    //create an empty variable to store one LI for each one the results
    var buildTheHtmlOutput = "";

    $.each(videosArray, function (videosArrayKey, videosArrayValue) {
        //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<p>" + videosArrayValue.snippet.title + "</p>"; //output vide title
        buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>"; //taget blank is going to open the video in a new window
        buildTheHtmlOutput += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>"; //display video's thumbnail
        buildTheHtmlOutput += "</a>";
        buildTheHtmlOutput += "</li>";
    });

    //use the HTML output to show it in the index.html
    $(".video-box ul").html(buildTheHtmlOutput);
}




////////////////////////////////////////////////////////
////// functions usage (triggers) ///////////////////////
////////////////////////////////////////////////////////


//when the page loads...
$(document).ready(function () {
    //do stuff
    $("section").hide();
    $(".intro-section").show();
    $(".explore-section").show();
    $(".intro-detail-section").show();
    $("nav ul").hide();

});

//button triggers
$(document).on('click', '.button-explore', function (event) {
    event.preventDefault();
    $("section").hide();
    $(".form-section").show();
});


//Step 1 - get the input from the user
$(document).submit('.search-form', function (event) {
    event.preventDefault();
    $("section").hide();
    $(".form-section").show();
    $(".result-section").show();
    $(".return-section").show();
    $("nav ul").show();
    //taking note from user//  
    let countryName = $('.country-names').val();
    console.log(countryName);
    //using the input, search for country name on Wikipedia
    getDataFromWikipedia(countryName);
    //using the input, search for country name on Youtube
    getDataFromYoutube(countryName);
});