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
    _500px.api('/photos/search', { geo: location, page: 1, sort:"highest_rating", image_size:2}, function (response) {
        $('#gallery').html("");

        console.log(response.data.photos.length);
        $.each(response.data.photos,function(index,photo) {
            var imageThumbnailUrl = photo.images[0].url;
            $('#gallery').append("<div class='col-3 text-center><a class='thumbnail' href='#'><img class='img-responsive img-thumbnail' src='"+imageThumbnailUrl+"'></a></div>"
            )
        })
    });
}