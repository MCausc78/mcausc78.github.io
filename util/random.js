window.onload = ()=>{
	var min = document.getElementById("min");
	var max = document.getElementById("max");
	document.getElementById('result').innerHTML = rnd(25, 500);
};
function rnd(min, max) {
	return (Math.floor(Math.random() * (max - min + 1) + min)) % max;
}
function gen() {
	var min = document.getElementById('min').value;
	var max = document.getElementById('max').value;
	console.log('[Gen]Минимальное:\''+min+'\'');
	console.log('[Gen]Максимальное:\''+max+'\'');
	if(min == '') {
		alert('Укажите минимальное число!');
		return undefined;
	}if(max == '') {
		alert('Укажите максимальное число!');
		return undefined;
	}
	min = parseInt(min);
	max = parseInt(max);
	if(min == NaN) {
		
		return NaN;
	}
	return rnd(min, max);
}
function __gen__() {
	var result = gen();
	var r = result;
	if(result == undefined) {
		r = 'Неправильное значение!';
	}
	document.getElementById('result').innerHTML = r;
}