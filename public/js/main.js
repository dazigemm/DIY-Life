// main.js gameplay code? toggle chapters on/off?
function update (nextChapt) {
	const current = document.querySelector('#current');
	current.innerHTML = nextChapt.current.effect;
}

function play (evt) {
	console.log('button was pressed');
	evt.preventDefault();
	const slug = document.querySelector('h1').innerHTML;
	const req = new XMLHttpRequest();
	req.open('GET', '/api/'+slug);
	req.addEventListener('load', function makeChoice () {
		if (req.status >= 200 && req.status < 400) {
			const story = JSON.parse(req.responseText);
			console.log(story);
			//for (let i = 0; i < 3; i++) {
				const choiceA = document.querySelector('#a');
				const choiceB = document.querySelector('#b');
				if (choiceA.checked) {
					update(story.chapts[1]);	
				}
				else if (choiceB.checked) {
					console.log('b was chosen');
				}
			//}
		}
	});
	req.send();
}

function main () {
	console.log('Loaded');
	const b = document.querySelector('#btn');
	b.addEventListener('click', play);	
}

document.addEventListener('DOMContentLoaded', main);

