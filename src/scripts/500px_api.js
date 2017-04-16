/**
 * Created by mohit on 2017-04-12.
 */

// init 500px api on document ready
$(function () {
    _500px.init({
        sdk_key: 'ce6e1bccbc00c66ea23f8f66e54920a432a1fa74'
    });

    // _500px.api('/photos', { feature: 'popular', page: 1 }, function (response) {
    //     console.log(response.data.photos);
    // });

})


function getImagesFrom500px(lat, lng) {

    var location = lat+","+lng+","+"3km";
    _500px.api('/photos/search', { geo: location, page: 1, sort:"highest_rating", image_size:[2,4]}, function (response) {
        $('#gallery').html("");
        $('.carousel-inner').html("");

        console.log(response.data.photos);
        $.each(response.data.photos,function(index,photo) {
            if(!photo.nsfw) {
                var imageThumbnailUrl = photo.image_url[0];
                var imageFullUrl = photo.image_url[1];
                var id = photo.id;
                $('#gallery').append("<div class='col-3 text-center  gallery-img'><a data-toggle='modal' data-target='#carousel-modal' onclick='setActiveImage("+ id +")'><img class='img-fluid img-thumbnail' src='" + imageThumbnailUrl + "'></a></div>");
                //$('#gallery').append("<div class='col-3 text-center  gallery-img'><a href='"+ imageFullUrl +"' data-toggle='lightbox' data-gallery='500px' data-title='A random title' data-footer='A custom footer text'><img src='"+ imageThumbnailUrl +"' class='img-fluid'></a></div>");
                $("<div class='carousel-item' id='"+ id +"'><img class='d-block img-fluid' src='" + imageFullUrl + "'></div>").appendTo('.carousel-inner');
            }
        });
        $('.carouselExampleControls').carousel('pause');
    });
    /*
     "<div class='carousel-item active'><img class='d-block img-fluid' src='images/placeholder.svg'></div>"
     */
}

// set the clicked image to active in the carousel
function setActiveImage(id) {
    $("#"+ id).addClass("active");
}

// clear all active class from carousel on modal hide
$('#carousel-modal').on('hide.bs.modal', function(e){
    $('.carousel-inner>div.active').removeClass("active");
    console.log("fired hide event");
});