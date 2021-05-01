$(document).ready(function () {
    $('.fave-button').click(isFavorite);

    function isFavorite() {
        var boardId = $(this).val();
        $.post(`/${boardId}/clicked?_method=PATCH`, { boardId }, (data) => {
            if (data) {
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
        });
    }
});
