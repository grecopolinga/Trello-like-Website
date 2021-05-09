function isFilled() {
    var boardName = validator.trim($('#board_name').val());
    var boardNameEmpty = validator.isEmpty(boardName);

    return !boardNameEmpty;
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
    if (filled) $('#board-add-confirm').prop('disabled', false);
    else $('#board-add-confirm').prop('disabled', true);
}

$('#board_name').keyup(() => {
    validateFields($('#board_name'), 'Board name', $('#boardNameError'));
});
