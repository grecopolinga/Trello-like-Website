$('.fave-button').click(isFavorite);

function isFavorite() {
    if ($(this).children('i').hasClass('fas fa-star')) {
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
}
