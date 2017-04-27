// main.js gameplay code? toggle chapters on/off?

function addChapts (evt) {
	evt.preventDefault();
	const slug = document.querySelector('h1').value;
	console.log(slug);
	
	//const req = new XMLHttpRequest();
	//req.open('POST', '/' + slug);
	//req.addEventListener('load', function 
}

function main () {
	console.log('Loaded');
	//const req = new XMLHttpRequest();
	//req.open('GET', '/beginning-anew');
	/*req.addEventListener('load', function handleStuff () {
		if (req.status >= 200 && req.status < 400) {
			console.log("These are...");
			console.log(req.responseText);
		}
	});*/
	const forms = document.getElementsByTagName('input');// array of all forms on page
	for (let i = 0; i < forms.length; i++) {
		console.log(forms[i]);
	}	
}

document.addEventListener('DOMContentLoaded', main);

