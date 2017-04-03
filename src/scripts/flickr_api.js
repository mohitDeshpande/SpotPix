/**
 * Created by DELL on 4/2/2017.
 */

$(document).ready(function () {

    var flickrAPI ='https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=68f9a3498ff770330ef51429836ba68a&user_id=66956608%40N06&format=rest&auth_token=72157678860534383-321835e8bafb0244&api_sig=8f0ca3e941f6fd4f64759402fa3447df';
    var pics= $("#allImages").val();

    $.getJSON(flickrAPI,{
        tags: pics,
        per_page: 50,
        format: "json"
    },

    function(data) {
        $.each( data.photos.photo, function( i, item ){
            var url = 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg';
            $('#singleImage').append('<img src="' + url + '"/>');
        });
    });
});