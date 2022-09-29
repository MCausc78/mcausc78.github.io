let words = [
	"javascript",
	"cat",
	"dog",
	"java",
	"banana",
	"size",
	"keyboard",
	"mouse",
	"computer",
	"phone",
	"guess",
	"user",
	"champion",
	"head",
	"tail",
	"assembly",
	"builder",
	"build",
	"disk",
	"machine",
	"car",
	"man",
	"desktop",
	"bed",
	"enter",
	"minus",
	"divide",
	"multiply",
	"add",
	"eat",
	"food",
	"box",
	"teacher",
	"room",
	"life",
	"way",
	"screen",
	"apple",
	"orange",
	"blue",
	"math",
	"ruby",
	"python",
	"red",
	"yellow",
	"green",
	"game",
	"snake",
	"monkey",
	"amazing",
	"pancake",
	"paint"
];

words.sort();

let word;
let answer;
let remaining;

function init() {
	word = words[Math.floor(Math.random() * words.length)];
	answer = new Array(word.length).fill('_');
	remaining = word.length;
}

init();

function start() {
	init();
	for(; remaining > 0; ) {
		let character = prompt('Угадай букву, или нажми \'Отмена\' чтобы прекратить игру');
		if(character === null) {
			return;
		} else if(character.length === 0) {
			continue;
		} else if(character.length !== 1) {
			alert("Пожалуйста, вводите обычную букву!");
			continue;
		} else {
			for(let i = 0; i < word.length; i++) {
				if(word[i] === character && answer[i] !== character) {
					answer[i] = character;
					remaining--;
				}
			}
		}
		alert(answer.join(' '));
	}
	alert(`Поздравляем, вы выиграли! Словом было '${word}'`);
}