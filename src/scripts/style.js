/**
 * Created by mohit on 2017-02-28.
 */
// All javascript related to dynamic html/css styling of the element goes here

// set height of section elements equal to height of the viewport
$('section').height($(window).height());

// animate scrolling to section
$('#find-btn').click(function () {
    $('body').animate({
        scrollTop: $('#map').offset().top
    }, 1200);
})