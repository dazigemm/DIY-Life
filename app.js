// app.js
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// Use __dirname to construct absolute paths for:
// 1. express-static
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// 2. hbs views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// link db
require('./db');
const mongoose = require('mongoose');
const Story = mongoose.model('Story');

// express-session
const session = require('express-session');
const sessionOptions = {
	secret: 'super secret',
	resave: true,
	saveUnitialized: true
};

app.use(session(sessionOptions));
//*/

// routes go here
app.get('/', function (req, res) {
	//res.send('hello world!');
	Story.find({}, (err, stories) => {
		if (err) {
			console.log(err);
			res.send('uh oh something went wrong');
		}
		console.log(stories);
		res.render('index', {stories: stories});
	});
});

app.get('/create', function (req, res) {
	res.render('create');
});

app.post('/create', function (req, res) {
	const t = req.body.title;
	const p = req.body.point;
	console.log("t: " + t);
	console.log("p: " + p);
	if (t.length < 1 || p.length < 1) {
		res.render('create', {error:'please enter something into the text fields'});
	}
	else {
		Story.findOne({title: t}, (err, result) => {
			if (err) {
				console.log(err);
				res.send('uh oh something went wrong');
			}
			if (result) {
				res.render('create', {error: 'story with this title already exists'});
			}
			const s = new Story({
				title: t,
				points: p
			});
			console.log("story created: " + s.title);
			s.save((err) => {
				if (err) {
					console.log(err);
					res.send('uh oh something went wrong');
				}
				res.redirect('/');
			});
		});
	}	
});

// LISTEN ON PORT 3000
app.listen(process.env.PORT || 3000);
console.log("started server on port 3000");
