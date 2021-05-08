const closeModal = document.querySelectorAll('.close-modal');
let isValidPassword = true;
let isValidEmail = true;
let isUpdate = false;

$('#deactivate-button').click(() => {
    $('#deactivate-modal').removeClass('hidden');
});

$('#deactivate-confirm').click(() => {
    $('#deactivate-modal').addClass('hidden');
});

$('#password').keyup(() => {
    let password = $('#password').val();

    if (password.length < 8 && password.length > 0) {
        $('#passwordError').removeClass('hidden');
        $('#updateError').addClass('hidden');
        isValidPassword = false;
    } else if (password.length == 0) {
        $('#passwordError').addClass('hidden');
        $('#updateError').addClass('hidden');
        isValidPassword = true;
    } else {
        $('#passwordError').addClass('hidden');
        $('#updateError').addClass('hidden');
        isValidPassword = true;
    }
});

$('#email').keyup(() => {
    let email = $('#email').val();

    console.log(email.includes('@'));
    if (!email.includes('@') && email.length > 0) {
        $('#emailError').removeClass('hidden');
        $('#updateError').addClass('hidden');
        isValidEmail = false;
    } else if (email.length == 0) {
        $('#emailError').addClass('hidden');
        $('#updateError').addClass('hidden');
        isValidEmail = true;
    } else {
        $('#emailError').addClass('hidden');
        $('#updateError').addClass('hidden');
        isValidEmail = true;
    }
});

$('#save-button').click(() => {
    if ($('#password').val().length == 0 && $('#email').val().length == 0) {
        isUpdate = false;
        $('#updateError').removeClass('hidden');
    } else {
        isUpdate = true;
        $('#updateError').addClass('hidden');
    }

    if (isValidPassword && isValidEmail && isUpdate) {
        $('#save-modal').removeClass('hidden');
    }
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
