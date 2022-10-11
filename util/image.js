class Color {
	constructor(rr=0, gg=0, bb=0) {
		this.rr = rr;
		this.gg = gg;
		this.bb = bb;
	}
}
class ImageError extends Error {}
class Image {
	constructor(width, height) {
		this.map = new Map();
		this.setWidth(width);
		this.setHeight(height);
		this.init();
	}
	getWidth() {
		return this.width;
	}
	getHeight() {
		return this.height;
	}
	setWidth(width) {
		if(typeof width == 'number') {
			if(width !== NaN)
				this.width = width;
			else throw new TypeError("number is NaN");
		} else throw new TypeError("not a number");
	}
	setHeight(height) {
		if(typeof height == 'number') {
			if(height !== NaN)
				this.height = height;
			else throw new TypeError("number is NaN");
		} else throw new TypeError("not a number");
	}
	init() {
		for(let x=0;x<this.getWidth();x++) {
			let heightmap = new Map();
			for(let y=0;y<this.getHeight();y++) {
				heightmap.set(y, new Color(0x00, 0x00, 0x00));
			}
			this.map.set(x, heightmap);
		}
	}
	drawAt(x, y, color) {
		if(typeof x !== 'number' || typeof y !== 'number' || !(color instanceof String)) throw new ImageError('expected number and color, got null');
		else if(x > this.getWidth() || y > this.getHeight()) throw new ImageError("out of range");
		this.map.get(x).set(y, color);
	}
}
class AnsiImage {
	constructor(width, height) {
		this.map = new Map();
		this.setWidth(width);
		this.setHeight(height);
		this.init();
	}
	getWidth() {
		return this.width;
	}
	getHeight() {
		return this.height;
	}
	setWidth(width) {
		if(typeof width == 'number') {
			if(width !== NaN)
				this.width = width;
			else throw new TypeError("number is NaN");
		} else throw new TypeError("not a number");
	}
	setHeight(height) {
		if(typeof height == 'number') {
			if(height !== NaN)
				this.height = height;
			else throw new TypeError("number is NaN");
		} else throw new TypeError("not a number");
	}
	init() {
		for(let x=0;x<this.getWidth();x++) {
			let heightmap = new Map();
			for(let y=0;y<this.getHeight();y++) {
				heightmap.set(y, '.');
			}
			this.map.set(x, heightmap);
		}
	}
	drawAt(x, y, color) {
		if((x instanceof Number) || (y instanceof Number) || (color instanceof String)) throw new ImageError('expected number and string, got null');
		else if(color.length >= 2) throw new ImageError('need one char');
		else if(x > this.getWidth() || y > this.getHeight()) throw new ImageError("out of range");
		this.map.get(x).set(y, color);
	}
}