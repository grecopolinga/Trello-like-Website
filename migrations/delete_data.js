const mongoose = require('mongoose');
const Boards = require('../models/Boards');
const Users = require('../models/Users');

const URI = 'mongodb://localhost:27017/TRONE';

async function deleteData() {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        });
        console.log('Connected to DB!');

        await Users.deleteMany({});
        await Boards.deleteMany({});
        console.log('Documents deleted');
        mongoose.disconnect();
    } catch (err) {
        console.log(err);
    }
}

deleteData();
