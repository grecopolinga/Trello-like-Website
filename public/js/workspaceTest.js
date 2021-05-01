$(document).ready(function () {
    class List {
        constructor(listName, id, place, cardId) {
            this.id = id;
            this.state = {
                listName: listName,
                listDesc: 'Write description here...',
                listComments: [],
            };
            (this.cardPlace = place), (this.card = cardId);
            this.render();
        }

        render() {
            this.value = $('<input>')
                .addClass('id')
                .attr('type', 'hidden')
                .val(this.id);
            this.div = $('<div>').attr('id', this.id);
            this.list = $('<div>').addClass('card');
            this.p = $('<p>').text(this.state.listName).addClass('listTitle');

            this.deleteButton = document.createElement('button');
            this.deleteButton.innerText = 'X';
            this.deleteButton.classList.add('delButton-list');

            //Clicking list to see list details
            this.list.click((e) => {
                if (e.target != this.deleteButton) {
                    this.showMenu.call(this);
                }
            });

            //Deleting List
            this.deleteButton.addEventListener('click', () => {
                var id = this.id;
                $.post(
                    `${window.location.pathname}/${this.card}/deleteCard?_method=DELETE`,
                    { id },
                    (data) => {
                        if (data) {
                            this.list.remove();
                        }
                    }
                );
            });

            this.list.append([this.value, this.p, this.deleteButton]);

            this.cardPlace.append(this.div);
            this.div.append(this.list);
        }

        showMenu() {
            //Elements of Menu
            this.menu = document.createElement('div');
            this.menuContainer = document.createElement('div');
            this.menuTitle = document.createElement('div');
            this.deleteButton = document.createElement('button');
            this.deleteButton.innerText = 'X';
            this.deleteButton.classList.add('closeButton-list');
            this.menuDescription = document.createElement('div');
            this.commentsInput = document.createElement('input');
            this.commentsButton = document.createElement('button');
            this.menuComments = document.createElement('div');

            //Class names
            this.menu.className = 'menu';
            this.menuContainer.className = 'menuContainer';
            this.menuTitle.className = 'menuTitle';
            this.menuDescription.className = 'menuDescription';
            this.menuComments.className = 'menuComments';
            this.commentsInput.className = 'commentsInput input_field';
            this.commentsButton.className = 'commentsButton btn-save-comment';

            //Inner Text
            this.commentsButton.innerText = 'Comment';
            this.commentsInput.placeholder = 'Write a comment...';

            //Event listeners
            this.deleteButton.addEventListener('click', () => {
                this.menuContainer.remove();
            });

            this.menuContainer.addEventListener('click', (e) => {
                console.log(e.target);
                if (e.target.classList.contains('menuContainer')) {
                    this.menuContainer.remove();
                }
            });

            this.commentsButton.addEventListener('click', () => {
                if (this.commentsInput.value != '') {
                    var listComment = this.commentsInput.value;
                    var id = this.id;

                    $.post(
                        `${window.location.pathname}/${this.card}/createComment?_method=POST`,
                        { listComment, id },
                        (data) => {
                            console.log(data);
                            if (data) {
                                this.state.listComments.push(listComment);
                                this.renderComments();
                            }
                        }
                    );

                    this.renderComments();
                    this.commentsInput.value = '';
                }
            });

            //Append
            this.menu.append(this.deleteButton);
            this.menu.append(this.menuTitle);
            this.menu.append(this.menuDescription);
            this.menu.append(this.commentsInput);
            this.menu.append(this.commentsButton);
            this.menu.append(this.menuComments);
            this.menuContainer.append(this.menu);
            $('#root').append(this.menuContainer);

            this.editableDescription = new EditCardTexts(
                this.state.listDesc,
                this.menuDescription,
                this,
                this.card,
                'listDesc',
                'textarea'
            );
            this.editableTitle = new EditCardTexts(
                this.state.listName,
                this.menuTitle,
                this,
                this.card,
                'listName',
                'input'
            );

            this.renderComments();
        }

        renderComments() {
            let currentCommentsDOM = Array.from(this.menuComments.childNodes);

            currentCommentsDOM.forEach((commentDOM) => {
                commentDOM.remove();
            });

            this.state.listComments.forEach((comment) => {
                new Comment(comment, this.menuComments, this, this.card);
            });
        }
    }

    class EditCardTexts {
        constructor(text, place, List, CardId, property, typeOfInput) {
            this.text = text;
            this.place = place;
            this.list = List; //"List" to be edited
            this.card = CardId; //"Card" it belongs to
            this.property = property;
            this.typeOfInput = typeOfInput;
            this.render();
        }

        render() {
            this.div = document.createElement('div');
            this.p = document.createElement('p');

            this.p.innerText = this.text;

            this.p.addEventListener('click', () => {
                this.showEditableTextArea.call(this);
            });

            this.div.append(this.p);
            this.place.append(this.div);
        }

        showEditableTextArea() {
            let oldText = this.text;

            this.input = document.createElement(this.typeOfInput);
            this.saveButton = document.createElement('button');

            this.p.remove();
            this.input.value = oldText;
            this.saveButton.innerText = 'Save';
            this.saveButton.className = 'btn-save-edit';
            this.input.classList.add('input_field');

            this.saveButton.addEventListener('click', () => {
                this.text = this.input.value;
                this.list.state[this.property] = this.input.value;

                if (this.property == 'listName') {
                    this.list.p.innerText = this.input.value; //Bugged: Cannot change in real-time, need to refresh to see changes

                    var listName = this.list.state[this.property];
                    var id = this.list.id;
                    $.post(
                        `${window.location.pathname}/${this.card}/updateCard?_method=PATCH`,
                        { listName, id },
                        (data) => {
                            if (data) {
                                console.log(this.list.id);
                                console.log(this.list);
                            }
                        }
                    );
                }
                if (this.property == 'listDesc') {
                    var listDesc = this.list.state[this.property];
                    var id = this.list.id;
                    $.post(
                        `${window.location.pathname}/${this.card}/updateCard?_method=PATCH`,
                        { listDesc, id },
                        (data) => {
                            if (data) {
                                console.log(data);
                            }
                        }
                    );
                }

                this.div.remove();
                this.render();
            });

            function clickSaveButton(event, object) {
                // "Enter" key's keycode equivalent is 13
                if (event.keyCode === 13) {
                    event.preventDefault();
                    object.saveButton.click();
                }
            }

            this.input.addEventListener('keyup', (e) => {
                if (this.typeOfInput == 'input') {
                    clickSaveButton(e, this);
                }
            });

            this.div.append(this.input);

            if (this.typeOfInput == 'textarea') {
                this.div.append(this.saveButton);
            }

            this.input.select();
        }
    }

    class Comment {
        constructor(text, place, list, cardId) {
            this.text = text;
            this.place = place;
            this.list = list;
            this.card = cardId;
            this.render();
        }

        render() {
            this.div = document.createElement('div');
            this.div.className = 'comment';
            this.div.innerText = this.text;
            this.deleteButton = document.createElement('button');
            this.deleteButton.innerText = 'X';

            var listComment = this.text;
            var id = this.list.id;

            this.deleteButton.addEventListener('click', () => {
                $.post(
                    `${window.location.pathname}/${this.card}/deleteComment?_method=DELETE`,
                    { listComment, id },
                    (data) => {
                        if (data) {
                            let i = this.list.state.listComments.indexOf(
                                this.text
                            );
                            this.list.state.listComments.splice(i, 1);
                            this.div.remove();
                            console.log(data);
                            console.log(i);
                        }
                    }
                );
            });

            this.div.append(this.deleteButton);
            this.place.append(this.div);
        }
    }

    // inline edit plugin
    $.fn.inlineEdit = function (replaceWith) {
        $(this).click(function () {
            var elem = $(this);
            var text = elem.text();
            var id;
            var listId;

            if (elem.attr('class') == 'cardTitle') {
                id = elem.parent().find('.id').val();
            }
            if (elem.attr('class') == 'listTitle') {
                id = elem
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .attr('id');
                listId = elem
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .attr('id');
            }
            if (elem.attr('class') == 'listDesc') {
                id = elem
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .attr('id');

                listId = elem
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .attr('id');
            }

            replaceWith.val(text);
            elem.hide();
            elem.after(replaceWith);
            replaceWith.after($('<br>'));
            replaceWith.focus();

            replaceWith.blur(function () {
                if ($(this).val() !== text && $(this).val() !== '') {
                    if (elem.parent().attr('class') == 'List') {
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
                    } else if (elem.attr('class') == 'listTitle') {
                        listName = $(this).val();
                        $.post(
                            `${window.location.pathname}/${listId}/updateCard?_method=PATCH`,
                            { listName, id },
                            (data) => {
                                if (data) {
                                    console.log(listName);
                                }
                            }
                        );
                        console.log(id);
                    } else if (elem.attr('class') == 'listDesc') {
                        var listDesc = $(this).val();
                        $.post(
                            `${window.location.pathname}/${listId}/updateCard?_method=PATCH`,
                            { listDesc, id },
                            (data) => {
                                if (data) {
                                    console.log(data);
                                }
                            }
                        );
                        console.log(listDesc);
                        console.log(listId);
                    }
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
    $('.listTitle').inlineEdit(replaceWith); //list title
    $('.listDesc').inlineEdit(replaceWith); //list description

    class Card {
        constructor(cardName, id) {
            this.cardName = cardName;
            this.id = id;
            this.listArray = [];
            this.createListElement();
        }

        createListElement() {
            this.value = $('<input>')
                .addClass('id')
                .attr('type', 'hidden')
                .val(this.id);
            this.card = $('<div>').addClass('List');
            this.title = $('<h2>').text(this.cardName).addClass('cardTitle');
            this.input = document.createElement('input');
            this.input.classList.add('input_field');
            this.button = document.createElement('button');
            this.button.innerText = 'Add';
            this.button.classList.add('btn-save-list');
            this.button.id = 'to-do-list-button';
            this.delButton = $('<button>')
                .text('X')
                .addClass('deleteButton delButton-card');

            // Creating List
            this.button.addEventListener('click', () => {
                if (this.input.value != '') {
                    var cardName = this.input.value;
                    $.post(
                        `${window.location.pathname}/${this.id}/createCard?_method=POST`,
                        { cardName },
                        (data) => {
                            console.log(data);
                            if (data) {
                                this.listArray.push(
                                    new List(
                                        data.cardName,
                                        data.id,
                                        this.card,
                                        this.id
                                    )
                                );
                            }
                        }
                    );
                }
            });

            //Deleting Card
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

    $('.delButton-card').click(function () {
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

    $('.delButton-list').click(function () {
        var id = $(this).val();
        var list = $(this).parent().parent().parent().attr('id');
        $.post(
            `${window.location.pathname}/${list}/deleteCard?_method=DELETE`,
            { id },
            (data) => {
                if (data) {
                    $(this).parent().remove();
                }
            }
        );
    });

    $('.delButton-comment').click(function () {
        var id = $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .attr('id');
        var listId = $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .attr('id');
        var listComment = $(this).parent().text();
        $.post(
            `${window.location.pathname}/${listId}/deleteComment?_method=DELETE`,
            { listComment, id },
            (data) => {
                if (data) {
                    $(this).parent().remove();
                }
            }
        );
    });

    $('.btn-save-list').click(function () {
        var cardId = $(this).val();
        var cardInputFieldId = '#cInput' + cardId;
        var cardName = $(cardInputFieldId).val();

        var list = $(this).parent().attr('id');
        $.post(
            `${window.location.pathname}/${list}/createCard?_method=POST`,
            { cardId, cardName },
            (data) => {
                if (data) {
                    console.log(data);
                    new List(
                        data.cardName,
                        data.id,
                        $(this).parent(),
                        $(this).parent().attr('id')
                    );
                }
                console.log(cardId);
            }
        );
    });

    $('.btn-save-comment').click(function () {
        var id = $(this).val();
        var listId = $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .attr('id');
        var listComment = $('.commentsInput').val();
        $.post(
            `${window.location.pathname}/${listId}/createComment?_method=POST`,
            { listComment, id },
            (data) => {
                if (data) {
                    console.log(data);
                }
            }
        );
        console.log(id);
        console.log(listId);
        console.log(listComment);
    });

    // Displaying/Closing list details modal

    $('.card').click(function (event) {
        const listDetails = document.getElementById(
            'menu' + $(this).parent().attr('id')
        );
        const closeModal = document.querySelectorAll('.closeButton-list');

        if (event.target.nodeName != 'BUTTON') {
            listDetails.classList.remove('hidden');
        }

        closeModal.forEach((close) => {
            close.addEventListener('click', () => {
                listDetails.classList.add('hidden');
            });
        });
    });
});
