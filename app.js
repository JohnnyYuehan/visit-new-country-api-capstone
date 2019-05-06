//Step 2 - define the function to make the api call; shopkeeper goes to warehouse to get shoe
function getDataFromApi(queryTarget) {

    //full AJAX intro https://www.w3schools.com/xml/ajax_intro.asp

    // Step 2a - make the api call using the URL, dataType (JSON or JSONP), type (GET or POST)
    $.ajax({
            type: "GET",
            url: 'https://dog.ceo/api/breed/' + queryTarget + '/images/random',
            dataType: 'json',
        })

        //Step 2b - success scenario (call the function to display the results)
        .done(function (dataOutput) {

            //displays the external api json object in the console
            displaySearchData(dataOutput);
        })

        // Step 2c - failure scenario (display errors)
        .fail(function (jqXHR, error, errorThrown) {

            //display errors
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};


//Step 3 - display the results; sales process
function displaySearchData(data) {

    //Step 3a - console.log the results
    console.log(data);

    //Step 3b - if there are no results show errors
    if (data.message == "") {

        //show and alert
        alert("No results");
    }

    //Step 3c - if there are results
    else {

        //create an HTML results variable
        let htmlOutput = "<li><img src='" + data.message + "'/></li>";


        //Step 3e - send the content of HTML results variable to the HTML - display them in the html page
        $('.js-search-results').html(htmlOutput);
    }
}





// Triggers


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


//form trigger
$(document).submit('.search-form', function (event) {
    event.preventDefault();
    $("section").hide();
    $(".form-section").show();
    $(".result-section").show();
    $(".return-section").show();
    $("nav ul").show();
//taking note from user//  
let queryTarget = $(event.currentTarget).find('.js-query').val();

//Step 1c - input validation - validate input
if (queryTarget == '') {
    alert("Please select a breed");
}


//Step 1d - use the api function - use that input values to call the getResults function defined at the top
getDataFromApi(queryTarget);

});