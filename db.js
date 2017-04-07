// db.js
const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
// need to fix
const User = new mongoose.Schema({
	name: String,
	password: String
});

const Event = new mongoose.Schema({
	before: Object,//Event,
	after: [Object],
	storyLine: String
});

const Story = new mongoose.Schema({
	writers: [User],
	title: String,
	events: [Event],//maybe save beginning of story?
	isFinished: String
});

Story.plugin(URLSlugs('title'));

mongoose.model('User', User);
mongoose.model('Event', Event);
mongoose.model('Story', Event);

// is the environment variable, NODE_ENV, set to PRODUCTION?
if (process.env.NODE_ENV === 'PRODUCTION') {
	//console.log("PRODUCTION PROPERLY SET");

	// if we're in PRODUCTION mode, then read the configuration from a file
	// use blocking file io to do this...
	var fs = require('fs');
	var path = require('path');
	var fn = path.join(__dirname, 'config.json');
	var data = fs.readFileSync(fn);

	// our configuration file will be in json, so parse it and set the 
	// connection string appropriately!
	var conf = JSON.parse(data);
	var dbconf = conf.dbconf;
}
else {
	//console.log("IDK WHAT'S GOING ON");
	// if we're not in PRODUCTION mode, then use
	dbconf = 'mongodb://localhost/dz994';
}

mongoose.connect(dbconf);
