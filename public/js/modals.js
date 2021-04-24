const closeModal = document.querySelectorAll('.close-modal');

$('#deactivate-button').click(() => {
    $('#deactivate-modal').removeClass('hidden');
});

$('#deactivate-confirm').click(() => {
    $('#deactivate-modal').addClass('hidden');
});

$('#save-button').click(() => {
    $('#save-modal').removeClass('hidden');
});

$('#save-confirm').click(() => {
    $('#save-modal').addClass('hidden');
});

closeModal.forEach((close) => {
    close.addEventListener('click', () => {
        $('#deactivate-modal').addClass('hidden');
        $('#save-modal').addClass('hidden');
    });
});
