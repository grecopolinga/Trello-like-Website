//Environment Variables
require('dotenv').config({ path: './config/config.env' });

const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const connectDB = require('./models/db');
const methodOverride = require('method-override');
const app = express();

// Connect to MongoDB
connectDB();

//Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Method Override
app.use(methodOverride('_method'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Serving at http://localhost:${PORT}`);
});
