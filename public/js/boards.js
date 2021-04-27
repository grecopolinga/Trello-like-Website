$('.fave-button').click(isFavorite);

// This function is used to change the star in the boards.
function isFavorite() {
    var boardId = $(this).val();
    $.get('/confirmFavorites', { boardId }, (data) => {
        if (data) {
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
        console.log(data);
    });
}
