console.log("Hello World!");

var fs = require('fs');
var urls = [];
var content = fs.read('output.csv');
if (content) {
	//lines = content.split(',');
	urls = content.split(',');
	/*for (var i = 0; i < lines.length; i++) {
		console.log(lines[i]);
	}*/
}
//console.log(urls);
//phantom.exit();

var page = require('webpage').create();
function handlePage (file) {
	page.open(file, function(status) {
		console.log(file + " Retrieval Status: " + status);
		setTimeout(nextPage, 100);
	});
}

function nextPage() {
	var file=urls.shift();
	if (!file){phantom.exit(0);}
	handlePage(file);
}
nextPage();

