/**
 * all methods and code related to the Google Maps JavaScript API goes here
 */

var API= 'AIzaSyCgMElgfY8buDapA2d3VO-7fWgMJCPqhqk';
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
    var marker;

    var request = new XMLHttpRequest();
    request.open("GET", "/data/locations.xml", false);
    request.send();
    var xml = request.responseXML;
    var locations = xml.getElementsByTagName("Location");
    for(var i = 0; i < locations.length; i++)
    {
        var location = locations[i];
        var postal_codes = location.getElementsByTagName("PostalCode");
        for(var j = 0; j < postal_codes.length; j++)
        {
            //alert(postal_codes[j].childNodes[0].nodeValue);
            var pc=postal_codes[j].childNodes[0].nodeValue;
            geocoder.geocode({'address': pc}, function (result, status)
            {
                if (status == google.maps.GeocoderStatus.OK)
                    {
                        marker = new google.maps.Marker
                        ({
                        position: result[0].geometry.location,
                        map: map
                        });

                    var info = "<h1>" + locations.LocationName + "</h1>" +
                        "<p>" + locations.address + "</p>";

                    var infowindow = new google.maps.InfoWindow({content: info});

                    marker.addListener('click', function () {infowindow.open(map, marker); });
                }
            });
        }
    }

   /* $(document).ready(function()
    {
        $.get('locations.xml', function (data) {
            postal_codes = data.PostalCode;
            console.log(postal_codes);

            for (var i = 0; i < postal_codes.length; i++)
            {
                geocoder.geocode({pc: postal_codes[i]}, function (result, status)
                {
                    if (status == google.maps.GeocoderStatus.OK)
                    {
                        //var location = results[0].geometry.location;
                        marker = new google.maps.Marker({
                            position: result[0].geometry.pc,
                            map: map
                        });

                        var info = "<h1>" + data.LocationName + "</h1>" +
                            "<p>" + data.address + "</p>";

                        var infowindow = new google.maps.InfoWindow({content: info});

                        marker.addListener('click', function () {infowindow.open(map, marker); });
                    }
                });
            }
        });
    })
*/
}



