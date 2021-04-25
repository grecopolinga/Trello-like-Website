const mongoose = require('mongoose');
const Users = require('../models/Users');

const URI = 'mongodb://localhost:27017/TRONE';

var users = [
    {
        fName: 'Sonson',
        lName: 'Great',
        username: 'Sonson_Great',
        email: 'sample@sample.com',
        password:
            '$2b$10$cv0xOlHgV.z0oa1epd6lbubfBYUKiAePR5IzBf54K6iQx4Xadyr/O', // Hakdoq1234
    },
    {
        fName: 'Leona',
        lName: 'Graves',
        username: 'L_Graves',
        email: 'leona.graves@example.com',
        password:
            '$2b$10$.pCXuXeK71uKVYpByLDNEeO7SXCuoQ9zIk0GTcQP84pYOtap3HLxm', //Leona_1234
    },
    {
        fName: 'Friedhelm',
        lName: 'Rüdiger',
        username: 'Fried_12',
        email: 'friedhelm.rudiger@example.com',
        password:
            '$2b$10$t4FhmawFk/ct7hbyFhJWRu3nCA.0Ex2.x7y.59v7nRHhVYw3y8pHm', //Chizudoggu11_
    },
    {
        fName: 'Stella',
        lName: 'Davies',
        username: 'StellaD',
        email: 'stella.davies@example.com',
        password:
            '$2b$10$KOMWBy8nYd89S/zLkzjJDOlV3QGQUBrlJ1HHVl8NIKfHrst36LiZi', //Bestoftherest143
    },
    {
        fName: 'Angelo',
        lName: 'Laurent',
        username: 'Angelo_Laurent',
        email: 'angelo.laurent@example.com',
        password:
            '$2b$10$dXpuzFA0UwpYh46PqppafeDsYZhn7liQ9Pxe/LvH1T6Q4BjD3Wbje', //Daraifurawa12
    },
];

async function insertUser(model, data) {
    try {
        const d = new model(data);
        await d.save();
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
