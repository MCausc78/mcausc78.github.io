// Скрипт
function _atob(str) {
	return decodeURIComponent(escape(window.atob(str)));
}
function _btoa(str) {
	return window.btoa(unescape(encodeURIComponent(str)));
}
window.onload = () => {
	var deftext = 'Hello, world!';
	document.getElementById("base64en").value = deftext;
	document.getElementById("base64de").value = btoa(deftext);
	document.getElementById('msg').style.color = 'green';
};

function getEnding() {
	var i = document.getElementById('end').selectedIndex;
	return i==0?'\n':(i==1?'\r\n':'\r');
}
function correctText(text) {
	return text.split('\n').join(getEnding());
}
function en64(text) {
	console.log('[Encode]' + JSON.stringify(text));
	var en;
	try {
		en = _btoa(text);
	}catch(ex){
		document.getElementById('msg').style.color = 'red';
		document.getElementById('msg').innerHTML = 'Ошибка';
		console.error('Исключение:');
		console.error('[В обычном виде] '+ex.toString());
		console.error('[Название]'+ex.name);
		return;
	}
	document.getElementById('msg').style.color = 'green';
	document.getElementById('msg').innerHTML = 'Успешно';
	document.getElementById("base64en").value = text;
	document.getElementById("base64de").value = en;
}
function de64(text) {
	console.log('[Decode]\'' + text + '\'');
	var de;
	try {
		de = atob(text);
	}catch(ex){
		document.getElementById('msg').style.color = 'red';
		document.getElementById('msg').innerHTML = 'Ошибка';
		console.error('Исключение:');
		console.error('[В обычном виде] '+ex.toString());
		console.error('[Название]'+ex.name);
		return;
	}
	document.getElementById('msg').style.color = 'green';
	document.getElementById('msg').innerHTML = 'Успешно';
	document.getElementById("base64de").value = text;
	document.getElementById("base64en").value = atob(text);
}
function update() {
	en64(correctText(document.getElementById('base64en').value));
	de64(correctText(document.getElementById('base64de').value));
}