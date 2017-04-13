/**
 * all methods and code related to the Google Maps JavaScript API goes here
 */

var googleAPI= 'AIzaSyCgMElgfY8buDapA2d3VO-7fWgMJCPqhqk';
map = null;
var toronto = {lat: 43.6426, lng: -79.3871};

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: toronto,
        zoom: 12,
        mapTypeId: 'roadmap'
    });

    plotMarkers(map);
    createMapSearch(map);

}

function createMapSearch(map) {
    // Create the search box and link it to the UI element.
    var input = document.getElementById('map-search');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });


    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

function plotMarkers(map)
{

    var geocoder = new google.maps.Geocoder();

    var request = new XMLHttpRequest();
    request.open("GET", "/data/locations.json", false);
    request.send();
    var json = JSON.parse(request.responseText);
    var locations = json.Locations.Location;
    console.log(locations.length);
    count = 0;
    locations.forEach(function(location)
    {
        count++;
        var location_name = location.LocationName;
        var address = location.Address;
        var x;
        var postal_code   = location.PostalCode;

        var compAdd=address+", ON "+ postal_code;


        geocoder.geocode({'address': compAdd}, function (result, status)
        {

            if (status == google.maps.GeocoderStatus.OK)
            {
                var marker = new google.maps.Marker
                ({
                    //console.log(singleAdd);
                    position: result[0].geometry.location,
                    map: map
                });

                console.log(result[0].geometry.location.lat() + "---" + result[0].geometry.location.lng());
                //console.log(result[0]);
                var info = "<h1>" + location_name + "</h1>" + "<p>" + address + "<br />" + postal_code + "</p>";

                var infowindow = new google.maps.InfoWindow({content: info});

                marker.addListener('click', function ()
                {
                    infowindow.open(map, marker);
                });
            }

        });

    });
    console.log("counter : " + count);
}



