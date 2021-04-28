// $('.fave-button').click((e) => {
//     let boardId = $(this).val();
//     alert(boardId);
//     $.get(`/clicked`, { boardId }, (data) => {
//         alert(data);
//         if (data) {
//             $(this)
//                 .children('i')
//                 .removeClass('fas fa-star')
//                 .addClass('fas fa-star-half-alt');
//         } else {
//             $(this)
//                 .children('i')
//                 .removeClass('fas fa-star-half-alt')
//                 .addClass('fas fa-star');
//         }
//         $(this).toggleClass('favorites');
//         // console.log(data);
//     });
// }

$('.fave-button').click(isFavorite);

// This function is used to change the star in the boards.
function isFavorite() {
    let boardId = $(this).val();
    alert(boardId);
    $.get('/clicked', { boardId }, (data) => {
        alert(data);
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
    });
}

// $('#search').click((e) => {
//     let search = $('#input-search').val();
//     alert(search);
//     $.get('/search', { search }, (data) => {
//         alert(data);
//     });
// });
