let root = document.getElementById('root');

class List {
    constructor(place, title) {
        this.place = place;
        this.title = title;
        this.cardArray = [];

        this.render();
    }

    addCard() {
        let text = this.input.value;
        this.cardArray.push(new Card(text, this.div, this));
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
        this.button.classList.add('btn-save-list');
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
        this.deleteButton.className = 'deleteButton delButton-card';
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

class Card {
    constructor(text, place, List) {
        this.place = place;
        this.List = List;
        this.state = {
            text: text,
            description: 'Click to edit description',
            comments: [],
        };
        this.render();
    }

    render() {
        this.card = document.createElement('div');
        this.card.classList.add('card');
        this.card.addEventListener('click', (e) => {
            if (e.target != this.deleteButton) {
                this.showMenu.call(this);
            }
        });

        this.p = document.createElement('p');
        this.p.innerText = this.state.text;

        this.deleteButton = document.createElement('button');
        this.deleteButton.innerText = 'X';
        this.deleteButton.addEventListener('click', () => {
            this.deleteCard.call(this);
        });

        this.card.append(this.p);
        this.card.append(this.deleteButton);
        this.place.append(this.card);
    }

    deleteCard() {
        this.card.remove();
        let i = this.List.cardArray.indexOf(this);
        this.List.cardArray.splice(i, 1);
    }

    showMenu() {
        //Elements of Menu
        this.menu = document.createElement('div');
        this.menuContainer = document.createElement('div');
        this.menuTitle = document.createElement('div');
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
        this.menuContainer.addEventListener('click', (e) => {
            console.log(e.target);
            if (e.target.classList.contains('menuContainer')) {
                this.menuContainer.remove();
            }
        });

        this.commentsButton.addEventListener('click', () => {
            if (this.commentsInput.value != '') {
                this.state.comments.push(this.commentsInput.value);
                this.renderComments();
                this.commentsInput.value = '';
            }
        });

        //Append
        this.menu.append(this.menuTitle);
        this.menu.append(this.menuDescription);
        this.menu.append(this.commentsInput);
        this.menu.append(this.commentsButton);
        this.menu.append(this.menuComments);
        this.menuContainer.append(this.menu);
        root.append(this.menuContainer);

        this.editableDescription = new EditCardTexts(
            this.state.description,
            this.menuDescription,
            this,
            'description',
            'textarea'
        );
        this.editableTitle = new EditCardTexts(
            this.state.text,
            this.menuTitle,
            this,
            'text',
            'input'
        );

        this.renderComments();
    }

    renderComments() {
        let currentCommentsDOM = Array.from(this.menuComments.childNodes);

        currentCommentsDOM.forEach((commentDOM) => {
            commentDOM.remove();
        });

        this.state.comments.forEach((comment) => {
            new Comment(comment, this.menuComments, this);
        });
    }
}

class EditCardTexts {
    constructor(text, place, card, property, typeOfInput) {
        this.text = text;
        this.place = place;
        this.card = card;
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
            this.card.state[this.property] = this.input.value;
            if (this.property == 'text') {
                this.card.p.innerText = this.input.value;
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
    constructor(text, place, card) {
        this.text = text;
        this.place = place;
        this.card = card;
        this.render();
    }

    render() {
        this.div = document.createElement('div');
        this.div.className = 'comment';
        this.div.innerText = this.text;

        this.deleteButton = document.createElement('button');
        this.deleteButton.innerText = 'X';
        this.deleteButton.addEventListener('click', () => {
            this.deleteComment.call(this);
        });

        this.div.append(this.deleteButton);
        this.place.append(this.div);
    }

    // Need to be debugged
    deleteComment() {
        this.div.remove();
        let i = this.card.state.comments.indexOf(this.div);
        this.card.state.comments.splice(i, 1);
    }
}

let addTodoListInput = document.getElementById('addTodoListInput');
let addTodoListButton = document.getElementById('addTodoListButton');

addTodoListButton.addEventListener('click', () => {
    if (addTodoListInput.value.trim() != '') {
        new List(root, addTodoListInput.value);
        addTodoListInput.value = '';
    }
});

let List1 = new List(root, 'House Chores');
let List2 = new List(root, 'School Project');
let List3 = new List(root, 'Reminders');
let List4 = new List(root, 'Business Related');
let List5 = new List(root, 'Done');

List1.input.value = 'Do laundry';
List1.addCard();
List1.cardArray[0].state.description =
    'Laundry work every Monday, Wednesday, and Friday.';
List1.cardArray[0].state.comments.push('Use Less Detergent');
List1.cardArray[0].state.comments.push('Separate colored and whites');
List1.cardArray[0].state.comments.push('Don’t use dryer');
List1.cardArray[0].state.comments.push('Don’t mix socks with clothes');
List1.cardArray[0].state.comments.push('Don’t leave clothes buttoned');
List1.input.value = '';

List1.input.value = 'Cook breakfast';
List1.addCard();
List1.cardArray[1].state.description =
    'Prepare breakfast meals for siblings and kids.';
List1.cardArray[1].state.comments.push(
    'Always prepare with milk or fruit juice'
);
List1.input.value = '';

List1.input.value = 'Wash the dishes';
List1.addCard();
List1.cardArray[2].state.description =
    'Clean the dishes for breakfast, lunch, and dinner.';
List1.input.value = '';

List1.input.value = 'Fix faucet';
List1.addCard();
List1.cardArray[3].state.description =
    'Broken faucet since last week. Needs to be fixed by Friday.';
List1.input.value = '';

List1.input.value = 'Iron clothes';
List1.addCard();
List1.cardArray[4].state.description =
    'Clothes must be ironed and prepared every morning for office work.';
List1.input.value = '';

List2.input.value = 'Prepare materials for project';
List2.addCard();
List2.cardArray[0].state.description =
    'Materials for the project must be complete by Sunday next week.';
List2.cardArray[0].state.comments.push('Buy coloring materials');
List2.cardArray[0].state.comments.push('Start at 10:00 AM');
List2.cardArray[0].state.comments.push('Prepare documents');
List2.input.value = '';

List2.input.value = 'Inform groupmates';
List2.addCard();
List2.cardArray[1].state.description =
    'Start to delegate tasks to every member. Distribution of work must be balanced.';
List2.input.value = '';
