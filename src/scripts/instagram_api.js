/**
 * Created by mohit on 2017-04-11.
 */
var accesstoken = "804571234.947a5bb.0696243a3d4b42beaaef5b47acd5bced";
var locationsURL = "https://api.instagram.com/v1/locations/search?lat=48.858844&lng=2.294351&access_token=ACCESS-TOKEN"


function findInstagramMediaAtLocation(lat, lng) {

    // make and ajax call
    $.ajax({
        url:"https://api.instagram.com/v1/media/search",
        crossDomain: true,
        async: true,
        data: {
            access_token: accesstoken,
            lat: lat,
            lng:lng,
            distance:5000
        },
        dataType : "jsonp",
        error: instrgramApiCallFail,
        success: function(data){console.log(JSON.stringify(data))   }
    })
}

function instrgramApiCallFail(jqXHR,textStatus,errorThrown) {
    console.error("Instragam call failed.\nError:"+errorThrown+"\nStatus:"+textStatus);
}

function findInstagramPhotosAtLocation(data,textStatus,jqXHR) {
    console.log(data);

    data.data.forEach(function (location) {

        var location_id = location.id;

        $.ajax({
            url: "https://api.instagram.com/v1/locations/" + location_id + "/media/recent",
            crossDomain: true,
            async: true,
            data: {
                access_token: accesstoken
            },
            dataType: "jsonp",
            error: instrgramApiCallFail,
            success: displayInstagramPhotos
        })
    })
}

function displayInstagramPhotos(data,textStatus,jqXHR) {
    console.log(data);
}