function isFilled() {
    var fName = validator.trim($('#fName').val());
    var lName = validator.trim($('#lName').val());
    var email = validator.trim($('#email').val());
    // var pw = validator.trim($('#password').val());

    var fNameEmpty = validator.isEmpty(fName);
    var lNameEmpty = validator.isEmpty(lName);
    var emailEmpty = validator.isEmpty(email);
    // var pwEmpty = validator.isEmpty(pw);

    return !fNameEmpty && !lNameEmpty && !emailEmpty;
}

function isValidPassword(field) {
    var validPassword = false;

    var password = validator.trim($('#password').val());
    var isValidLength = validator.isLength(password, { min: 8 });

    if (isValidLength || password.length == 0) {
        if (field.is($('#password'))) $('#passwordError').text('');
        validPassword = true;
    } else {
        if (field.is($('#password')))
            $('#passwordError').text(
                'Password should contain at least 8 characters.'
            );
    }

    return validPassword;
}

function validateFields(field, fieldname, err) {
    var value = validator.trim(field.val());
    var empty = validator.isEmpty(value);

    if (empty) {
        field.prop('value', '');
        err.text(fieldname + ' should not be empty.');
    } else {
        err.text('');
    }

    var filled = isFilled();
    var validPassword = isValidPassword(field);
    if (filled && validPassword) $('#save-button').prop('disabled', false);
    else $('#save-button').prop('disabled', true);
}

$('#fName').keyup(() => {
    validateFields($('#fName'), 'First Name', $('#fNameError'));
});

$('#lName').keyup(() => {
    validateFields($('#lName'), 'Last Name', $('#lNameError'));
});

$('#password').keyup(() => {
    validateFields($('#password'), 'Password', $('#passwordError'));
});

$('#email').keyup(() => {
    validateFields($('#email'), 'Email', $('#emailError'));
});
