const mongoose = require('mongoose');
const Users = require('../models/Users');
const Boards = require('../models/Boards');

const URI = 'mongodb://localhost:27017/TRONE';
var users = [
    {
        fName: 'Sonson',
        lName: 'Great',
        username: 'Sonson_Great',
        email: 'sample@sample.com',
        password:
            '$2b$10$cv0xOlHgV.z0oa1epd6lbubfBYUKiAePR5IzBf54K6iQx4Xadyr/O', // Hakdoq1234
        img: 'default.png',
    },
    {
        fName: 'Leona',
        lName: 'Graves',
        username: 'L_Graves',
        email: 'leona.graves@example.com',
        password:
            '$2b$10$.pCXuXeK71uKVYpByLDNEeO7SXCuoQ9zIk0GTcQP84pYOtap3HLxm', //Leona_1234
        img: 'default.png',
    },
    {
        fName: 'Friedhelm',
        lName: 'Rüdiger',
        username: 'Fried_12',
        email: 'friedhelm.rudiger@example.com',
        password:
            '$2b$10$t4FhmawFk/ct7hbyFhJWRu3nCA.0Ex2.x7y.59v7nRHhVYw3y8pHm', //Chizudoggu11_
        img: 'default.png',
    },
    {
        fName: 'Stella',
        lName: 'Davies',
        username: 'StellaD2',
        email: 'stella.davies@example.com',
        password:
            '$2b$10$KOMWBy8nYd89S/zLkzjJDOlV3QGQUBrlJ1HHVl8NIKfHrst36LiZi', //Bestoftherest143
        img: 'default.png',
    },
    {
        fName: 'Angelo',
        lName: 'Laurent',
        username: 'Angelo_Laurent',
        email: 'angelo.laurent@example.com',
        password:
            '$2b$10$dXpuzFA0UwpYh46PqppafeDsYZhn7liQ9Pxe/LvH1T6Q4BjD3Wbje', //Daraifurawa12
        img: 'default.png',
    },
];

var boards = [
    {
        boardFavorite: false,
        boardName: 'Term 3 Tasks',
        boardLabel: 'Important',
        boardLists: [
            {
                listName: 'CCAPDEV',
                cards: [
                    {
                        cardName: 'Phase 1',
                        cardDesc: 'Phase 1 Tasks',
                        cardComments: ['HTML', 'CSS', 'Javascript'],
                    },
                    {
                        cardName: 'Phase 2',
                        cardDesc: 'Phase 2 Tasks',
                        cardComments: [
                            'Databases',
                            'Users Module',
                            'Boards Module',
                        ],
                    },
                    {
                        cardName: 'Phase 3',
                        cardDesc: 'Phase 3 Tasks',
                        cardComments: [
                            'Form Validation',
                            'Sessions',
                            'Deployment',
                        ],
                    },
                ],
            },
            {
                listName: 'STALGCM',
                cards: [
                    {
                        cardName: 'Towering Arcana',
                        cardDesc: 'Problem Set',
                        cardComments: [
                            'Regular Languages',
                            'Pumping Lemma',
                            'Push Down Automata',
                        ],
                    },
                    {
                        cardName: 'Push Down Automata Problem',
                        cardDesc: 'Bonus Problem',
                        cardComments: [
                            'Regular Languages',
                            'Pumping Lemma',
                            'Push Down Automata',
                        ],
                    },
                ],
            },
        ],
    },
    {
        boardFavorites: false,
        boardName: 'CEMATH',
        boardLabel: 'Acads',
        boardLists: [
            {
                listName: 'Project Proposal',
                cards: [
                    {
                        cardName: 'Discussion',
                        cardDesc: 'MATLAB',
                        cardComments: ['MATLAB', '1D', 'Signals'],
                    },
                    {
                        cardName: 'Project Proposal',
                        cardDesc: 'Powerpoint',
                        cardComments: [],
                    },
                    {
                        cardName: 'Project Proposal',
                        cardDesc: 'PDF',
                        cardComments: [
                            'Target Topic',
                            'Implementation',
                            'Test Plan',
                            'Project Specification',
                        ],
                    },
                ],
            },
        ],
    },
    {
        boardFavorites: true,
        boardName: 'LBYTRN1',
        boardLabel: 'Acads',
        boardLists: [
            {
                listName: 'Individual',
                cards: [
                    {
                        cardName: 'HW1',
                        cardDesc: 'Mesh Analysis',
                        cardComments: [],
                    },
                    {
                        cardName: 'HW2',
                        cardDesc: 'LTSPice',
                        cardComments: [],
                    },
                ],
            },
        ],
    },
    {
        boardFavorites: false,
        boardName: 'Home activities',
        boardLabel: 'Home',
        boardLists: [
            {
                listName: 'Morning',
                cards: [
                    {
                        cardName: 'Laundry',
                        cardDesc: 'Clean clothes',
                        cardComments: ['buy', 'detergent', 'wash'],
                    },
                    {
                        cardName: 'Prepare food',
                        cardDesc: 'Cook',
                        cardComments: ['But groceries'],
                    },
                ],
            },
            {
                listName: 'Afternoon',
                cards: [
                    {
                        cardName: 'Exercise',
                        cardDesc: 'Get fit',
                        cardComments: ['30 mins', '3 sets'],
                    },
                    {
                        cardName: 'Wash dishes',
                        cardDesc: 'Clean after meals',
                        cardComments: ['7 pm', 'every Friday'],
                    },
                ],
            },
        ],
    },
    {
        boardFavorites: false,
        boardName: 'Org Tasks',
        boardLabel: 'Extra',
        boardLists: [
            {
                listName: 'PTS',
                cards: [
                    {
                        cardName: 'Morning Session',
                        cardDesc: 'Morning Tutorial Session',
                        cardComments: ['CCDSTRU', 'CCPROG2'],
                    },
                ],
            },
        ],
    },
];

async function insertUser(model, data) {
    try {
        const d = new model(data);
        await d.save();
        for (const board of boards) {
            const b = new Boards({ user: d._id, ...board });
            await b.save();
        }

        console.log('Inserted 1 Document');
    } catch (err) {
        console.log(err);
    }
}

async function insert() {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        });
        console.log('Connected to DB!');

        for (const user of users) {
            await insertUser(Users, user);
        }

        mongoose.disconnect();
    } catch (err) {
        console.log(err);
    }
}

insert();
