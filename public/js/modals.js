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

$('#confirm-password').keyup(() => {
    $('#confirm-err').addClass('hidden');
});

$('#save-confirm').click((e) => {
    let cPassword = $('#confirm-password').val();
    $.get(`${window.location.pathname}/confirm`, { cPassword }, (data) => {
        if (data) {
            $('#confirm-password').val('');
            $('#save-modal').addClass('hidden');
            $('#confirm-err').addClass('hidden');
            $('#settings_form').submit();
        } else {
            $('#confirm-err').removeClass('hidden');
        }
    });
});

closeModal.forEach((close) => {
    close.addEventListener('click', () => {
        $('#deactivate-modal').addClass('hidden');
        $('#save-modal').addClass('hidden');
        $('#confirm-err').addClass('hidden');
        $('#confirm-password').val('');
    });
});
