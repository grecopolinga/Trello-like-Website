//Environment Variables
require('dotenv').config({ path: './config/config.env' });

const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

//Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Routes
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/auth'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Serving at http://localhost:${PORT}`);
});
