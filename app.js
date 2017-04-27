// app.js
const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// express-session
const session = require('express-session');
const sessionOptions = {
	secret: 'super secret',
	resave: true,
	saveUnitialized: true
};

app.use(session(sessionOptions));
/*/

app.use(session({secret: 'superSecret'}));
*/
// link db
require('./db');
const mongoose = require('mongoose');
const Choice = mongoose.model('Choice');
const Chapter = mongoose.model('Chapter');
const Story = mongoose.model('Story');
const User = mongoose.model('User');

// passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());


// ROUTES 

// List all of the stories. If asked, filter for only complete or incomplete
app.get('/', function (req, res) {
	const stat = req.query.filterCategory;
	Story.find({}, (err, stories) => {
		if (err) {
			console.log(err);
			res.send('uh oh something went wrong');
		}
		if (stat === "Incomplete") {
			stories = stories.filter(function(ele) {
				return ele.chapts.length < 7;
			});
		}
		else if (stat === "Complete") {
			stories = stories.filter(function(ele) {
				return ele.chapts.length === 7;
			});
		}
		res.render('index', {stories: stories, stat: stat, user: req.user});
	});
});

app.get('/login', function(req, res) {
	res.render('login', {user: req.user});
});

app.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
});

app.get('/register', function(req, res) {
	res.render('register');
});

app.post('/register', function(req, res) {
	const pw = req.body.password;
	const name = req.body.username;
	User.register(new User({username: name}), pw, function(err, user) {
		if (err) {
			return res.render('register', {user: user});
		}
		passport.authenticate('local')(req, res, function () {
			res.redirect('/');
		});
	});	
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/create', function (req, res) {
	res.render('create');
});

app.post('/create', function (req, res) {
	const t = req.body.title;
	const p = req.body.point;
	const c = new Choice({
		action: null,
		effect: p
	});
	const chapt = new Chapter({
		current: c
	});	
	//console.log("t: " + t);
	//console.log("p: " + p);
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
				chapts: [chapt]
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

// get last few incomplete chapters
function getTail (len) {
	let ctr = 1;
	let x = 1;
	while (x < len) {
		ctr *= 2;
		x += ctr;
	}
	return ctr;
}

app.get('/:slug', function(req, res) {
	Story.findOne({slug: req.params.slug}, (err, sFound) => {
		if (err) {
			console.log(err);
		}
		/* **** chrome makes favicon requests? ==> null error
		console.log("for: " + req.params.slug);
		console.log("Here is the story found:\n" + sFound);
		console.log("does it have a length? " + sFound.length);
		//console.log(sFound.chapts.length);
		//*/
		if (sFound !== null) {
		       	const len = sFound.chapts.length;
			if (len < 7) {// incomplete story
				const num = getTail(len);
				const last = len - num;// index of last added chapter
				const toUpdate = [];
				const indices = [];
				for (let i = len -1; i > last - 1; i--) {
					toUpdate.push({index: i, chap: sFound.chapts[i]});
					indices.push(i);
				}
				console.log(toUpdate);		
				res.render('cont', {story: sFound, chapts: toUpdate, ind: indices});
			}
			else {// complete story
				res.render('play', {story: sFound});
			}
		}//*/
	});
	//res.render('cont');//, {story: sFound});
});

app.post('/:slug', function (req, res) {
	const s = req.params.slug;
	const cA = new Choice ({
		action: req.body.aOne,
		effect: req.body.eOne
	});
	const cB = new Choice ({
		action: req.body.aTwo,
		effect: req.body.eTwo
	});
	// SEARCH FOR CHAPTER INSTEAD?
	// HOW TO KNOW IF END? MAYBE ADD LEVEL PROPERTY TO CHAPT?
       	//console.log("hereeeeee");
	//console.log(req.body);
	Story.findOne({slug: s}, (err, sFound) => {
		if (err) {
			console.log(err);
		}
		// FIX THIS, SHOULD NOT BE CHAPTER 0, LOOK FOR LATEST CHAPTER
		//const t = sFound.chapts.length - 1;
		const t = req.body.index;
		sFound.chapts[t].choiceA = cA;
		sFound.chapts[t].choiceB = cB;
		const chaptA = new Chapter({
			current: cA
		});
		const chaptB = new Chapter({
			current: cB
		});
		sFound.chapts.push(chaptA);
		sFound.chapts.push(chaptB);
		sFound.markModified('chapts');
		//sFound.markModified('choiceB');
		sFound.save(function(err, modifiedStory) {
			console.log(err, modifiedStory);
		});
		res.redirect(s);	
	});	
	//res.redirect(s);
});

// LISTEN ON PORT 3000
app.listen(process.env.PORT || 3000);
console.log("started server on port 3000");
