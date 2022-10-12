const bsz = 5;

let arrow = 3;
let interval = null;
let rows = 60;
let cols = 120;
const directions = {
	up: 0,
	left: 1,
	down: 2,
	right: 3
};

function bpack(a, b, bits=32) {
	return (a | (b << bits));
}


function rand(min=0, max=100) {
	if(max > min)
		return rand(max, min);
	else if(min == max)
		return min;
	return Math.floor( min + (Math.random() * (max - min) ) );
}

class Block {
	constructor(x=0, y=0) {
		this.x(x);
		this.y(y);
	}
	x(v=undefined) {
		if(v === undefined || v === null)
			return this._x;
		this._x = v;
		return this;
	}
	y(v=undefined) {
		if(v === undefined || v === null)
			return this._y;
		this._y = v;
		return this;
	}
	equals(obj) {
		return (this.x() == obj.x() && this.y() == obj.y());
	}
}

let apple = new Block();

let segments = [
	new Block(3, 3),
	new Block(4, 3),
	new Block(5, 3)
];

function apply(obj, direction) {
	return ([
		(function() { // up
			return new Block(obj.x(), obj.y() - 1);
		}),
		(function() { // left
			return new Block(obj.x() - 1, obj.y());
		}),
		(function() { // down
			return new Block(obj.x(), obj.y() + 1);
		}),
		(function() { // right
			return new Block(obj.x() + 1, obj.y());
		})
	][direction]());
}

function draw() {
	let s = '';
	for(let y=0; y < rows; y++) {
		for(let x=0; x < cols; x++) {
			if(new Block(x, y).equals(apple)) {
				s += 'A';
			} else if( segments.some( block => block.equals( new Block( x, y ) ) ) ) {
				s += '@';
			} else {
				s += '.';
			}
		}
		s += '\n';
	}
	return s;
}

function update() {
	[
		(function() { // up
			console.log('up');
		}),
		(function() { // left
			console.log('left');
		}),
		(function() { // down
			console.log('down');
		}),
		(function() { // right
			console.log('right');
		})
	][arrow]();
	segments.shift();
	let head = segments.slice(-1)[0];
	segments.push( apply( head, arrow ) );
	if(segments.some(segment => segment.x() < 0 || segment.y() < 0 || segment.x() >= cols || segment.y() >= rows)) {
		clearInterval(interval);
		alert('Lose');
	} else if(segments.some(segment => segment.equals(apple))) {
		segments.unshift( new Block( head.x(), head.y() ) );
		apple = new Block(rand(0, cols), rand(0, rows))
	}
	document.getElementById('out').textContent = draw();
}

document.getElementById('area').addEventListener('keydown', function(e) {
	const k = ({
		38: 0,	// up
		37: 1,	// left
		40: 2,	// down
		39: 3	// right
	})[e.keyCode] ?? null;
	if(k === null)
		return;
	arrow = k;
});

function restart(tps, resetSnake=true) {
	if(!(interval === null))
		clearInterval(interval);
	if(resetSnake) {
		segments = [
			new Block(3, 3),
			new Block(4, 3),
			new Block(5, 3)
		];
		arrow = directions.right;
		apple = new Block(rand(0, cols), rand(0, rows))
	}
	interval = setInterval(update, tps);
}
setTimeout(function() {
	restart(300, true);
}, 500);