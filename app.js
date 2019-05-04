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
    
});