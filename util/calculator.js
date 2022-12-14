// default regex
//let rgx = /(\d+)\s?(%|\*|-|\+|\/|<<|>>|>>>|&|\||\^)\s?(\d+)/;
let rgx = /(.*)\s?(%|mod|\*\*|\*|mul|-|minus|\+|plus|\/\/|\/|div|\<\<|shl|\>\>|shr|&|and|\||or|\^|xor|pow|\!=|ne|==|eq|\<|lt|\<=|le|\>|gt|\>=|ge)\s?(.*)/;

// factorial detecting
var frgx = /^(\d+)\!(.*)/;

let n, x, y, expr, er;

// function call regex
let callrgx = /([\w\d]+)\((.*)\);?/gi;

// string regex
let strrgx = /["'](.*)["']/;

function factorial(n=0n) {
	let r = 1n;
	for(let i=0n; i < n; i++)
		r *= n - i;
	return r;
}

function evalulate(str) {
	if(frgx.test(str)) {
		// factorial
		let r = 0;
		str.replace(frgx, (_, rs, err) => {
			if(err.length != 0) {
				throw new TypeError(JSON.stringify({
					id: 2,
					operand: 2,
					argument: err
				}));
			} else {
				try {
					r = BigInt(rs);
				} catch(ex) {
					throw new TypeError(JSON.stringify({
						id: 2,
						operand: 1,
						argument: rs
					}));
				}
				r = factorial(r);
			}
		});
		return r;
	} else if(rgx.test(str)) {
		let r;
		str.replace(rgx, (_, xs, op, ys) => {
			try {
				//x = BigInt(xs);
				x = evalulate(xs);
			} catch(ex) {
				throw new TypeError(JSON.stringify({
					id: 0,
					operand: 1,
					argument: xs
				}));
			}
			try {
				//y = BigInt(ys);
				y = evalulate(ys);
			} catch(ex) {
				throw new TypeError(JSON.stringify({
					id: 0,
					operand: 2,
					argument: ys
				}));
			}
			r = 0n;
			switch(op) {
			case '%': case 'mod':	r = x % y; break;
			case '*': case 'mul':	r = x * y; break;
			case '**': case 'pow':	r = Math.pow(Number(x), Number(y)); break;
			case '-': case 'minus':	r = x - y; break;
			case '+': case 'plus':	r = x + y; break;
			case '/': case 'div':	r = x / y; break;
			case '//': case 'floor':r = Math.floor(Number(x / y)); break;
			case '<<': case 'shl':	r = x << y; break;
			case '>>': case 'shr':	r = x >> y; break;
			case '&': case 'and':	r = x & y; break;
			case '|': case 'or':	r = x | y; break;
			case '^': case 'xor':	r = x ^ y; break;
			case '!=': case 'ne':	r = x != y; break;
			case '==': case 'eq':	r = x == y; break;
			case '<': case 'lt':	r = x < y; break;
			case '<=': case 'le':	r = x <= y; break;
			case '>': case 'gt':	r = x > y; break;
			case '>=': case 'ge':	r = x >= y; break;

			default:
				throw new TypeError(JSON.stringify({
					id: 1,
					args: [x.toString(), op, y.toString()]
				}));
			}
		});
		return r;
	} else if(callrgx.test(str)) {
		let matches = str.match(callrgx);
		return ( typeof(Math[matches[1]]) == 'function' ? Math[matches[1]](matches[2]) : Math[matches[1]] );
	} else if(strrgx.test(str)) {
		return str.slice(1, -1);
	} else {
		try {
			return BigInt(str);
		} catch(ex) {
			return null;
		}
	}
	return null;
}

function start() {
	for(;;) {
		expr = prompt('???????????????????', '7!');
		if(expr == 'exit')
			break;
		if(frgx.test(expr)) {
			// factorial
			expr.replace(frgx, (_, ns, err) => {
				if(err.length != 0) {
					alert(`???????????????????????? ??????????????????: '${expr}'.`);
					console.log(ns);
					console.log(err);
					return null;
				} else {
					try {
						n = BigInt(ns);
					} catch(ex) {
						alert(`???????????????????????? ??????????????: '${ns}'`);
						console.error(ex);
						console.log(ns);
						return null;
					}
					alert(`${n}! = ${factorial(n)}`);
				}
			});
			continue;
		}
		er = expr.replace(rgx, (_, xs, op, ys) => {
			try {
				x = BigInt(xs);
			} catch(ex) {
				alert(`???????????????????????? ?????????????? 1: '${xs}'`);
				console.error(ex);
				console.log(x);
				return null;
			}
			try {
				y = BigInt(ys);
			} catch(ex) {
				alert(`???????????????????????? ?????????????? 2: '${ys}'`);
				console.error(ex);
				console.log(x);
				console.log(y);
				return null;
			}
			r = 0n;
			/*switch(op) {
			case '%': r = x % y; break;
			case '*': r = x * y; break;
			case '-': r = x - y; break;
			case '+': r = x + y; break;
			case '/': r = x / y; break;
			case '<<': r = x << y; break;
			case '>>': r = x >> y; break;
			case '&': r = x & y; break;
			case '|': r = x | y; break;
			case '^': r = x ^ y; break;
			default:
				alert(`?????????????????????? ????????????????: '${op}'`);
				return null;
			}*/
			try {
				r = evalulate(expr);
			} catch(ex) {
				try {
					if(JSON.parse(ex.message).id == 1) {
						alert(`?????????????????????? ????????????????: '${op}'`);
					} else {
						alert(`??????-???? ?????????? ???? ?????? ?? ?????????????????????????????? (${ex.message})`);
					}
					return null;
				} catch(ex2) {
					alert(`??????-???? ?????????? ???? ?????? ?? ?????????????????? JSON :(\n${ex.stack}\n${ex.message}`);
					alert(`??????. ????????????????????:\n${ex2.stack}\n${ex2.message}`);
					return null;
				}
			}
			alert(`${x} ${op} ${y} = ${r}`);
			return null;
		});
		if(er == expr) {
			evr = evalulate(expr);
			if(evr != null) {
				alert(evr);
			} else {
				alert(`???????????????????????? ?????????????????? 2: '${expr}'.`);
				console.log(x);
				console.log(y);
			}
			continue;
		}
	}
}