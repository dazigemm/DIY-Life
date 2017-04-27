console.log("Hello World!");
var urls = ['http://linserv2.cims.nyu.edu:21531/login',
	'http://linserv2.cims.nyu.edu:21531/register', 
	'http://linserv2.cims.nyu.edu:21531'];

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
