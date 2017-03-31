// app.js
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// Use __dirname to construct absolute paths for:
/ 1. express-static
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// 2. hbs views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// link db
require('./db');

// express-session
const session = require('express-session');
const sessionOptions = {
	secret: 'secret cookie thang',
	resave: true,
	saveUnitialized: true
};

app.use(session(sessionOptions));

// routes go here


// LISTEN ON PORT 3000
app.listen(3000);
console.log("started server on port 3000");
