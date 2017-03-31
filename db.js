// db.js
const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const User = new mongoose.Schema({
	name: String,
	password: String
});

const Event = new mongoose.Schema({
	before: Event,
	after: [Event],
	storyLine: String
});

const Story = new mongoose.Schema({
	writers: [User],
	title: String,
	events: [Event],//maybe save beginning of story?
	isFinished: boolean
});

Story.plugin(URLSlugs('title'));

mongoose.model('User', User);
mongoose.model('Event', Event);
mongoose.model('Story', Event);

mongoose.connect('mongodb://localhost/final');
