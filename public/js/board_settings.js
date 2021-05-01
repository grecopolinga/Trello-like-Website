const closeModal = document.querySelectorAll('.close-modal');

$('#board-settings-button').click(() => {
    $('#board-settings-modal').removeClass('hidden');
});

$('#board-settings-confirm').click(() => {
    $('#board-settings-modal').addClass('hidden');
});

closeModal.forEach((close) => {
    close.addEventListener('click', () => {
        $('#board-settings-modal').addClass('hidden');
    });
});
