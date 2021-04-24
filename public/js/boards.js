// This function is used to sort the boards.
function sortBy(value) {
    let boards = document.getElementById('root'); // container of the boards
    let elements = document.querySelectorAll('#root > div'); // all elements inside boards
    let temp = []; // temp storage which will be sorted
    let slides = []; // temp storage for that map

    // Iterates through all elemenents in boards
    for (let i = 0; i < elements.length; i++) {
        let slide = {
            html: elements[i],
        };

        let name = elements[i].getAttribute('id').split('.'); // Splits the id that contains name.label.dateAdded

        if (value == 'sortName') {
            slide.temp = name[0];
            temp.push(String(name[0]));
        } else if (value == 'sortLabel') {
            slide.temp = name[1];
            temp.push(String(name[1]));
        } else if (value == 'sortDate') {
            slide.temp = Date.parse(name[2]);
            temp.push(Number(Date.parse(name[2])));
        } else {
            return 0;
        }

        slides.push(slide);
    }

    temp.sort();

    // Used to remove the childnodes
    elements.forEach(function (node) {
        node.remove();
    });

    // Appends the sorted elements
    for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < slides.length; j++) {
            if (slides[j].temp == temp[i]) {
                //console.log(slides[j].temp);
                boards.appendChild(slides[j].html);
            }
        }
    }
}

$('.fave-button').click(isFavorite);

// This function is used to change the star in the boards.
function isFavorite() {
    if ($(this).hasClass('favorites')) {
        $(this)
            .children('i')
            .removeClass('fas fa-star')
            .addClass('fas fa-star-half-alt');
    } else {
        $(this)
            .children('i')
            .removeClass('fas fa-star-half-alt')
            .addClass('fas fa-star');
    }
    $(this).toggleClass('favorites');
    console.log(this);
}
