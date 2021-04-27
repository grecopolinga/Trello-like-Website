$('.fave-button').click(isFavorite);

// This function is used to change the star in the boards.
function isFavorite() {
    if ($(this).hasClass('favorites')) {
        $(this)
            .children('i')
            .removeClass('fas fa-star')
            .addClass('fas fa-star-half-alt');
    } else {
        $(this)
            .children('i')
            .removeClass('fas fa-star-half-alt')
            .addClass('fas fa-star');
    }
    $(this).toggleClass('favorites');
    console.log(this);
}
