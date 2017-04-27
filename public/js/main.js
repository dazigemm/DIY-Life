// main.js 
function update (nextChapt) {
	const current = document.querySelector('#current');
	const dex = document.querySelector('#index').value;
	current.innerHTML = nextChapt.current.effect;
	if (dex < 3) {
		const a = document.querySelector('#a').nextSibling;	
		a.innerHTML = nextChapt.choiceA.action;
		const b = document.querySelector('#b').nextSibling;
		b.innerHTML = nextChapt.choiceB.action;
	}
	else {
		document.querySelector('form').className = 'invisible';
		document.querySelector('#end').classList.toggle('invisible');
	}
}

function play (evt) {
	//console.log('button was pressed');
	evt.preventDefault();
	const slug = document.querySelector('h1').innerHTML;
	const index = document.querySelector('#index');
	let nextIndex = index.value * 2 + 1;
	//console.log(index);
	
	const req = new XMLHttpRequest();
	req.open('GET', '/api/'+slug);
	req.addEventListener('load', function makeChoice () {
		if (req.status >= 200 && req.status < 400) {
			const story = JSON.parse(req.responseText);
			console.log(story);
			const choiceA = document.querySelector('#a');
			const choiceB = document.querySelector('#b');
			if (choiceA.checked) {
				index.value = nextIndex;
				update(story.chapts[nextIndex]);	
			}
			else if (choiceB.checked) {
				nextIndex += 1;
				index.value = nextIndex;
				update(story.chapts[nextIndex]);
			}
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

