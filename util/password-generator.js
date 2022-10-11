function about() {
	
}
function __clear__() {
	document.getElementById('out').value = '';
	document.getElementById('out').rows = 2;
}
function dwrite(s='', formats=[]) {
	let out = document.getElementById('out');
	out.value += (format(s, formats));
}

function dwriteln(s='', formats=[]) {
	let out = document.getElementById('out');
	if(out.cols < s.length)
		out.cols = s.length + 1;
	dwrite(s+'\n', formats);
}

function format(s='', formats=[]) {
	if(s === null || s === undefined || formats === null || formats === undefined) return null;
	else if(formats.length == 0) return s;
	for(let i in formats) {
		s = s.replace('{}', formats[i]).replaceAll('{'+(i)+'}', formats[i]);
	}
	return s;
}

function rnd(min, max) {
	return (Math.floor(Math.random() * (max - min + 1) + min)) % max;
}
function getPassword() {
	let password = '';
	let chars = document.getElementById('usersymbols').value==''?((document.getElementById('digits').checked?'0123456789':'') + (document.getElementById('lowercase').checked?'abcdefghijklmnopqrstuvwxyz':'') + (document.getElementById('uppercase').checked?'ABCDEFGHIJKLMNOPQRSTUVWXYZ':'') + (document.getElementById('symbols').checked?'!@#$%^&*':'')):document.getElementById('usersymbols').value;
	let len = document.getElementById('length').value;
	for(let i=0;i<len;i++)
		password += ''+chars.charAt(rnd(0, chars.length)).toString();
	return password;
}

function update() {
	let count = document.getElementById('count').value;
	let len = document.getElementById('length').value;
	let usingSymbols = (document.getElementById('usersymbols').value == '');
	let rq = (!(document.getElementById('digits').checked) && !(document.getElementById('lowercase').checked) && !(document.getElementById('uppercase').checked) && !(document.getElementById('symbols').checked));
	if(usingSymbols && rq) {
		alert('Учти какие-нибудь символы!');
		document.getElementById('digits').checked = true;
		document.getElementById('lowercase').checked = true;
	}
	document.getElementById('out').value = '';
	document.getElementById('out').rows = parseInt(count)+1;
	document.getElementById('out').cols = len;
	document.getElementById('digits').disabled = !usingSymbols;
	document.getElementById('lowercase').disabled = !usingSymbols;
	document.getElementById('uppercase').disabled = !usingSymbols;
	document.getElementById('symbols').disabled = !usingSymbols;
	document.getElementById('ulength').innerHTML = len;
	document.getElementById('ucount').innerHTML = count;
	for(let i=0;i<count;i++) {
		dwriteln(getPassword());
	}
}

window.onload = ()=>{
	update();
};