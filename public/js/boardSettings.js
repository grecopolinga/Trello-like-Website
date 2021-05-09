// Board settings modal
const closeModal = document.querySelectorAll('.close-modal');
let boardName = $('#board_name').val();
let boardLabel = $('#board_label').val();

$('#board-settings-button').click(() => {
    $('#board-settings-modal').removeClass('hidden');
    $('#board_name').val(boardName);
    $('#board_label').val(boardLabel);
});

$('#board-settings-confirm').click(() => {
    $('#board-settings-modal').addClass('hidden');
});

closeModal.forEach((close) => {
    close.addEventListener('click', () => {
        $('#board-settings-modal').addClass('hidden');
        $('#boardNameError').text('');
    });
});
