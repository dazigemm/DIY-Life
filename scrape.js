var fs = require('fs');
var path = 'output.csv';

console.log("Hello World!");
var urls = ['http://linserv2.cims.nyu.edu:21531/login',
	'http://linserv2.cims.nyu.edu:21531/register', 
	'http://linserv2.cims.nyu.edu:21531/'];

var page = require('webpage').create();
//*
page.open('http://linserv2.cims.nyu.edu:21531/', function(status) {
		
	const links = page.evaluate(function() {
		return [].map.call(document.getElementsByTagName("a"), function (lin) {
			return lin.href;
		});
	});
	console.log("Links Found: ");
	console.log(links.join('\n'));
	//console.log(links);
	//console.log("List of Stories:");
	//console.log(links.length);
	/*for (let i = 0; i < links.length; i++) {//doesn't work
		console.log(links[i].innerHTML);
	}*/
	fs.write(path, links, 'w');
	phantom.exit();
});

/*
function handlePage (file) {
	page.open(file, function(status) {
		console.log(file + " Retrieval Status: " + status);
		const links = page.evaluate(function() {
			return document.getElementsByTagName("a");
		});
		for (let i = 0; i < links.length; i++) {
			urls.push(links[i].href);
		}/
		setTimeout(nextPage, 100);
	});
}

function nextPage() {
	var file=urls.shift();
	if (!file){phantom.exit(0);}
	handlePage(file);
}
nextPage();
*/
