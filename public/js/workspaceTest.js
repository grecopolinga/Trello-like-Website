$(document).ready(function () {
    class List {
        constructor(title) {
            this.title = title;
            this.cardArray = [];

            this.render();
        }

        render() {
            this.createListElement();
            this.place.append(this.ListElement);
        }

        createListElement() {
            //Create elements
            this.h2 = document.createElement('h2');
            this.h2.innerText = this.title;
            this.input = document.createElement('input');
            this.input.classList.add('input_field');
            this.button = document.createElement('button');
            this.button.innerText = 'Add';
            this.button.classList.add('btn-save');
            this.button.id = 'to-do-list-button';
            this.div = document.createElement('div');
            this.ListElement = document.createElement('div');

            //Event listener
            this.button.addEventListener('click', () => {
                if (this.input.value != '') {
                    this.addCard.call(this);
                    this.input.value = '';
                }
            });

            this.deleteButton = document.createElement('button');
            this.deleteButton.className = 'deleteButton delButton';
            this.deleteButton.innerText = 'X';
            this.deleteButton.addEventListener('click', () => {
                this.deleteList.call(this);
            });

            //Append elements to List
            this.ListElement.append(this.deleteButton);
            this.ListElement.append(this.h2);
            this.ListElement.append(this.input);
            this.ListElement.append(this.button);
            this.ListElement.append(this.div);
            this.ListElement.classList.add('List');
        }

        deleteList() {
            this.ListElement.remove();
        }
    }
    // inline edit plugin
    $.fn.inlineEdit = function (replaceWith) {
        $(this).click(function () {
            var elem = $(this);
            var text = elem.text();
            var id = elem.parent().find('.id').val();

            replaceWith.val(text);
            elem.hide();
            elem.after(replaceWith);
            replaceWith.after($('<br>'));
            replaceWith.focus();

            replaceWith.blur(function () {
                if ($(this).val() !== text) {
                    var listName = $(this).val();
                    $.post(
                        `${window.location.pathname}/updateList?_method=PATCH`,
                        { listName, id },
                        (data) => {
                            if (data) {
                                console.log(data);
                            }
                        }
                    );
                    elem.html($(this).val());
                }

                $(this).remove();
                elem.show();
                elem.parent().find('br').remove();
            });
        });
    };

    var replaceWith = $('<input type="text" class="input_field" />');
    $('.cardTitle').inlineEdit(replaceWith);

    class Card {
        constructor(cardName, id) {
            this.cardName = cardName;
            this.id = id;
            this.createListElement();
        }

        createListElement() {
            this.value = $('<input>')
                .addClass('id')
                .attr('type', 'hidden')
                .val(this.id);
            this.card = $('<div>').addClass('List');
            this.title = $('<h2>').text(this.cardName).addClass('cardTitle');
            this.input = $('<input>').addClass('input_field');
            this.button = $('<button>')
                .text('Add')
                .addClass('btn-save')
                .attr('id', 'to-do-list-button');
            this.delButton = $('<button>')
                .text('X')
                .addClass('deleteButton delButton');

            this.delButton.click(() => {
                var id = this.id;
                $.post(
                    `${window.location.pathname}/deleteList?_method=DELETE`,
                    { id },
                    (data) => {
                        if (data) {
                            this.card.remove();
                        }
                    }
                );
            });

            this.title.inlineEdit(replaceWith);

            this.card.append([
                this.value,
                this.delButton,
                this.title,
                this.input,
                this.button,
            ]);
            $('#root').append(this.card);
        }
    }

    $('#addTodoListButton').click(() => {
        var listName = $('#addTodoListInput').val();
        $.post(
            `${window.location.pathname}/createList`,
            { listName },
            (data) => {
                console.log(data);
                if (data) {
                    new Card(data.listName, data.id);
                }
            }
        );
    });

    $('.deleteButton').click(function () {
        var id = $(this).val();
        $.post(
            `${window.location.pathname}/deleteList?_method=DELETE`,
            { id },
            (data) => {
                if (data) {
                    $(this).parent().remove();
                }
            }
        );
    });
});
