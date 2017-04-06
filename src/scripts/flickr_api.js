/**
 * Created by DELL on 4/2/2017.
 */

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=223e8cae5910e38f767393f23f8308c8&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1",
    "method": "GET",
    "headers": {}
};

$.ajax(settings).done(function (data) {
    console.log(data);



    $("#allImages").append(data.photos.photo[0].title + " Gallery");
    $.each( data.photos.photo, function( i, gp ) {

        var farmId = gp.farm;
        var serverId = gp.server;
        var id = gp.id;
        var secret = gp.secret;

        console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

        $("#singleImage").append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg"/>');

    });
})




/*
$(document).ready(function () {

    console.log("hello woerld");
    var flickrAPI ='https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=223e8cae5910e38f767393f23f8308c8&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1';
    var pics= $("#allImages").val();
    var Photoids= new Array();


    $.getJSON(flickrAPI,{
            photos: {
                page: 1,
                pages: 0,
                perpage: 100,
                total: 0,
                photo: [ ]
            },
            stat: "ok"
        },

    function(data) {
        $.each( data.photos, function( i, item ){
            var Photo="";
            Photo=item.photo.id;
            Photoids.push(Photo);
            var url = 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.o-secret + '.jpg';
            $('#singleImage').append("<img src=" + url + "/>");
            console.log(url);
        });

    });
});
 */