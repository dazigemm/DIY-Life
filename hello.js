console.log('Hello World!');
var page = require('webpage').create();
page.open('http://linserv2.cims.nyu.edu:21531/', function (status) {
	var title = page.evaluate(function() {
		return document.title;
	});
	console.log('Page title is ' + title);
	phantom.exit();
});
