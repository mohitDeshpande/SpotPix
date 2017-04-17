/**
 * Created by DELL on 4/2/2017.
 */



function showImages(lat,lon) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.flickr.com/services/rest",
        "method": "GET",
        data: {
            method:"flickr.photos.search",
            api_key: "30e2a4d93e16fe26f8a046b824724e0e",
            lat: lat,
            lon: lon,
            radius: 3,
            format: "json",
            nojsoncallback : 1
        },
        dataType : "json",
        error : flickrApiCallFail,
        success : function (data) {
           // console.log(JSON.stringify(data));
            var thumbnailSize ="q";
            var photoSize = "b"
            $.each( data.photos.photo, function( i, gp ) {
                var farmId = gp.farm;
                console.log(JSON.stringify(gp));
                var serverId = gp.server;
                var id = gp.id;
                var secret = gp.secret;
                // TODO aditya to change URL according to 500px js file
                //$("div#flickr div.gallery").append('<div class="col-3 text-center gallery-img"><a data-toggle="modal" data-target="#carousel-modal" onclick="setActiveImage('+ id +')" ><img class="img-fluid img-thumbnail" src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '_' + thumbnailSize +'.jpg"/></a></div>');

            });

        }
    };

    $.ajax(settings);
};


function flickrApiCallFail(jqXHR,textStatus,errorThrown) {
    console.error("Flickr call failed.\nError:"+errorThrown+"\nStatus:"+textStatus);
}






/*
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5694a32a5ee5ad831040d61ae92921ef&lat=43.6426&lon=-79.3871&format=json&nojsoncallback=1",
    "method": "GET",
    data : {
        api_key : "5694a32a5ee5ad831040d61ae92921ef",
        lat : 43.6426 ,
        lon : -79.3871,
        format : "json"
    },

};

$.ajax(settings).done(function (data) {
    //console.log(data);



   // $("#allImages").append(data.photos.photo[0] + " Gallery");
    $.each( data.photos.photo[0], function( i, gp ) {

        var farmId = gp.farm;
        var serverId = gp.server;
        var id = gp.id;
        var secret = gp.secret;

//       console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

        $("#singleImage").append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg"/>');

    });
})


*/