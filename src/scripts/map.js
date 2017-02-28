/**
 * Created by mohit on 2017-02-28.
 */
/**
 * all methods and code related to the Google Maps JavaScript API goes here
 */

var map;

var toronto = {lat:43.6426, lng: -79.3871};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: toronto,
        zoom: 12
    });
}
// TODO add map search box https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
