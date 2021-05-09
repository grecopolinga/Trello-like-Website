const closeModal = document.querySelectorAll('.close-modal');

$('#board-add-button').click(() => {
    $('#board-add-modal').removeClass('hidden');
    $('#board_name').val('');
    $('#boardNameError').text('');
});

$('#board-add-confirm').click(() => {
    $('#board-add-modal').addClass('hidden');
});

closeModal.forEach((close) => {
    close.addEventListener('click', () => {
        $('#board-add-modal').addClass('hidden');
    });
});
