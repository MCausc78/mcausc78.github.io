function getEnding() {
	var i = document.getElementById('end').selectedIndex;
	return i==0?'\n':(i==1?'\r\n':'\r');
}
function correctText(text) {
	return text.split('\n').join(getEnding());
}
async function _hash(msg, algorithm) {
	return Array.from(new Uint8Array((await crypto.subtle.digest(algorithm, (new TextEncoder().encode(msg)))))).map((b) => b.toString(16).padStart(2, '0')).join('');
}
function hash(msg) {
	msg = correctText(msg);
	var r = '?';
	var a = document.getElementById('algorithm').options[document.getElementById('algorithm').selectedIndex].innerHTML;
	r = _hash(msg, a).then(m=>{
		document.getElementById('hash').innerHTML=m;
	});
	return document.getElementById('hash').innerHTML;
}
function update() {
	document.getElementById('hash').innerHTML = hash(document.getElementById('input').value);
}
window.onload = () => {
	var def = 'Hello, world!';
	document.getElementById('input').value = def;
	update();
};