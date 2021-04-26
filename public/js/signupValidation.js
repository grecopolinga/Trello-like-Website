$(document).ready(function () {
    function isFilled() {
        var fName = validator.trim($('#firstname').val());
        var lName = validator.trim($('#lastname').val());
        var username = validator.trim($('#reg_username').val());
        var email = validator.trim($('#email').val());
        var pw = validator.trim($('#reg_password').val());

        var fNameEmpty = validator.isEmpty(fName);
        var lNameEmpty = validator.isEmpty(lName);
        var usernameEmpty = validator.isEmpty(username);
        var emailEmpty = validator.isEmpty(email);
        var pwEmpty = validator.isEmpty(pw);

        return (
            !fNameEmpty &&
            !lNameEmpty &&
            !usernameEmpty &&
            !emailEmpty &&
            !pwEmpty
        );
    }

    function isValidUsername(field, cb) {
        var username = validator.trim($('#reg_username').val());
        var isValidLength = validator.isLength(username, { min: 8 });

        if (isValidLength) {
            $.get('/getCheckUser', { username }, (res) => {
                console.log(res);
                if (res) {
                    console.log('User is unique');
                    if (field.is($('#reg_username'))) {
                        $('#reg_usernameError').text('');
                    }
                    return cb(true);
                } else {
                    if (field.is($('#reg_username'))) {
                        console.log('User is not unique');

                        $('#reg_usernameError').text(
                            'Username is already taken.'
                        );
                        return cb(false);
                    }
                }
            });
        } else {
            if (field.is($('#reg_username'))) {
                $('#reg_usernameError').text(
                    'Username should be 8 characters long.'
                );
                return cb(false);
            }
        }
    }

    function isValidPassword(field) {
        var validPassword = false;

        var password = validator.trim($('#reg_password').val());
        var isValidLength = validator.isLength(password, { min: 8 });

        if (isValidLength) {
            if (field.is($('#reg_password'))) $('#reg_passwordError').text('');
            validPassword = true;
        } else {
            if (field.is($('#reg_password')))
                $('#reg_passwordError').text(
                    'Passwords should contain at least 8 characters.'
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
        isValidUsername(field, (validUser) => {
            if (filled && validPassword && validUser) {
                $('#submit').prop('disabled', false);
            } else {
                $('#submit').prop('disabled', true);
            }
        });
    }

    $('#firstname').keyup(function () {
        validateFields($('#firstname'), 'First name', $('#firstnameError'));
    });

    $('#lastname').keyup(function () {
        validateFields($('#lastname'), 'Last name', $('#lastnameError'));
    });

    $('#reg_username').keyup(function () {
        validateFields($('#reg_username'), 'Username', $('#reg_usernameError'));
    });

    $('#email').keyup(function () {
        validateFields($('#email'), 'Email', $('#emailError'));
    });

    $('#reg_password').keyup(function () {
        validateFields($('#reg_password'), 'Password', $('#reg_passwordError'));
    });
});
