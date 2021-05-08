const mongoose = require('mongoose');
const Boards = require('../models/Boards');
const Users = require('../models/Users');

const URI =
    'mongodb://dbadmin:dbpassword@cluster0-shard-00-00.2jx6x.mongodb.net:27017,cluster0-shard-00-01.2jx6x.mongodb.net:27017,cluster0-shard-00-02.2jx6x.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-e298gx-shard-0&authSource=admin&retryWrites=true&w=majority';

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
