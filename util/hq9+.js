function dwriteln(s='', formats=[]) {
	document.getElementById('out').value += (format(s, formats)) + '\n';
}

function format(s='', formats=[]) {
	if(s === null || s === undefined || formats === null || formats === undefined) return null;
	else if(formats.length == 0) return s;
	for(let i in formats) {
		s = s.replace('{}', formats[i]).replaceAll('{'+(i)+'}', formats[i]);
	}
	return s;
}

class Runner {
	constructor() {
		this.counter = 0;
	}
	eval(str, line='<in>') {
		if(str === '') return;
		for(let chi=0;chi<str.length;chi++) {
			let ch = str.substring(chi, chi+1);
			if(ch == 'H')
				dwriteln('Hello, world!');
			else if(ch == 'Q')
				dwriteln(str, []);
			else if(ch == '9') {
				for(let bottle=99;bottle>0;bottle--) {
					dwriteln('{0} {1} of beer on the wall, {0} {1} of beer.', [bottle, (bottle!=1?'bottles':'bottle')]);
					dwriteln('Take one down and pass it around, {0} {1} of beer on the wall.', [(bottle-1!=0?bottle-1:'no more'), (bottle-1!=1?'bottles':'bottle')]);
					dwriteln();
				}
				dwriteln('No more bottles of beer on the wall, no more bottles of beer.');
				dwriteln('Go to the store and buy some more, 99 bottles of beer on the wall.');
			} else if(ch == '+') this.counter++;
			else {
				dwriteln('HQSyntaxException: {0}', [ch]);
				dwriteln('\tat <in>({0}:{1})', [line, chi]);
			}
		}
	}
}
var runner = new Runner();
function run() {
	let val = document.getElementById('in').value;
	let arr = val.split('\n');
	document.getElementById('out').value = '';
	for(let elem in arr) {
		runner.eval(arr[elem], elem);
	}
}
window.onload = ()=>{
	document.getElementById('in').value = 'H';
	document.getElementById('run').click();
}