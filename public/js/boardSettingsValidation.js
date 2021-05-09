function isFilled() {
    var boardName = validator.trim($('#board_name').val());
    var boardNameEmpty = validator.isEmpty(boardName);

    return !boardNameEmpty;
}

function isValidLabel() {
    return !(
        $('#board_label').attr('data-initial-value') === $('#board_label').val()
    );
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
    var changedLabel = isValidLabel();

    if (filled || changedLabel)
        $('#board-settings-confirm').prop('disabled', false);
    else $('#board-settings-confirm').prop('disabled', true);
}

$('#board_name').keyup(() => {
    validateFields($('#board_name'), 'Board name', $('#boardNameError'));
});

$('#board_label').keyup(() => {
    validateFields($('#board_name'), 'Board name', $('#boardNameError'));
});
