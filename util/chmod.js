class Permissions {
	/*#r;
	get #readable() {
		return this.r;
	}
	set #readable(r) {
		this.setReadable(r);
	}
	#w;
	get #writeable() {
		return this.r;
	}
	set #writeable(w) {
		this.setWriteable(w);
	}
	#x;
	get #executable() {
		return this.x;
	}
	set #executable(x) {
		this.setExecutable(x);
	}*/
	constructor(r=false, w=false, x=false) {
		this.r = r;
		this.w = w;
		this.x = x;
	}
	isReadable() {
		return this.r;
	}
	isWriteable() {
		return this.w;
	}
	isExecutable() {
		return this.x;
	}
	setReadable(r) {
		if(typeof r === 'boolean')
			this.r = r;
		else
			throw new TypeError("not a boolean");
	}
	setWriteable(w) {
		if(typeof w === 'boolean')
			this.w = w;
		else
			throw new TypeError("not a boolean");
	}
	setExecutable(x) {
		if(typeof x === 'boolean')
			this.x = x;
		else
			throw new TypeError("not a boolean");
	}
	toString() {
		return (this.isReadable()?'r':'-')+(this.isWriteable()?'w':'-')+(this.isExecutable()?'x':'-');
	}
	toInt() {
		switch(this.toString()) {
			case "---":
				return 0;
			case "--x":
				return 1;
			case "-w-":
				return 2;
			case "-wx":
				return 3;
			case "r--":
				return 4;
			case "r-x":
				return 5;
			case "rw-":
				return 6;
			case "rwx":
				return 7;
			default:
				return 0;
		}
		return null;
	}
}
class Mode {
	/*
	#ownerPermissions;
	get #ownerPermissions() {
		return this.getOwnerPermissions();
	}
	set #ownerPermissions(ownerPermissions) {
		this.setOwnerPermissions(ownerPermissions);
	}

	#groupPermissions;
	get #groupPermissions() {
		return this.getGroupPermissions();
	}
	set #groupPermissions(groupPermissions) {
		this.setGroupPermissions(groupPermissions);
	}
	#usersPermissions;
	get #usersPermissions() {
		return this.getUsersPermissions();
	}
	set #usersPermissions(usersPermissions) {
		this.setUsersPermissions(usersPermissions);
	}*/
	constructor(ownerPermissions=new Permissions(true, true, true), groupPermissions=new Permissions(), usersPermissions=new Permissions()) {
		this.ownerPermissions = ownerPermissions;
		this.groupPermissions = groupPermissions;
		this.usersPermissions = usersPermissions;
	}
	getOwnerPermissions() {
		return this.ownerPermissions;
	}
	getGroupPermissions() {
		return this.groupPermissions;
	}
	getUsersPermissions() {
		return this.usersPermissions;
	}
	setOwnerPermissions(ownerPermissions) {
		if(typeof ownerPermissions === 'Permissions')
			this.ownerPermissions = ownerPermissions;
		else
			throw new TypeError("not a permissions");
	}
	setGroupPermissions(groupPermissions) {
		if(typeof groupPermissions === 'Permissions')
			this.groupPermissions = groupPermissions;
		else
			throw new TypeError("not a permissions");
	}
	setUsersPermissions(usersPermissions) {
		if(typeof usersPermissions === 'Permissions')
			this.usersPermissions = usersPermissions;
		else
			throw new TypeError("not a permissions");
	}


}
class Calculator {
	/*#mode;
	get #mode() {
		return this.getMode();
	}
	set #mode(mode) {
		this.setMode(mode);
	}*/
	constructor(mode=new Mode()) {
		this.mode = mode;
	}
	getMode() {
		return this.mode;
	}
	setMode(mode) {
		if(typeof mode === 'Mode')
			this.mode = mode;
		else
			throw new TypeError("not a mode");
	}
	toNumber() {
		return this.getMode().getOwnerPermissions().toInt().toString() + this.getMode().getGroupPermissions().toInt().toString() + this.getMode().getUsersPermissions().toInt().toString();
	}
	toString() {
		return this.getMode().getOwnerPermissions().toString() + this.getMode().getGroupPermissions().toString() + this.getMode().getUsersPermissions().toString();
	}
	toCommand() {
		return 'chmod ' + this.toNumber() + ' myfile.txt';
	}
}

var calc;
window.onload = () => {
	calc = new Calculator();
	document.getElementById('or').checked = calc.getMode().getOwnerPermissions().isReadable();
	document.getElementById('ow').checked = calc.getMode().getOwnerPermissions().isWriteable();
	document.getElementById('ox').checked = calc.getMode().getOwnerPermissions().isExecutable();
	document.getElementById('gr').checked = calc.getMode().getGroupPermissions().isReadable();
	document.getElementById('gw').checked = calc.getMode().getGroupPermissions().isWriteable();
	document.getElementById('gx').checked = calc.getMode().getGroupPermissions().isExecutable();
	document.getElementById('ur').checked = calc.getMode().getUsersPermissions().isReadable();
	document.getElementById('uw').checked = calc.getMode().getUsersPermissions().isWriteable();
	document.getElementById('ux').checked = calc.getMode().getUsersPermissions().isExecutable();
	update();
}
function update() {
	calc.getMode().getOwnerPermissions().setReadable(document.getElementById('or').checked);
	calc.getMode().getOwnerPermissions().setWriteable(document.getElementById('ow').checked);
	calc.getMode().getOwnerPermissions().setExecutable(document.getElementById('ox').checked);
	calc.getMode().getGroupPermissions().setReadable(document.getElementById('gr').checked);
	calc.getMode().getGroupPermissions().setWriteable(document.getElementById('gw').checked);
	calc.getMode().getGroupPermissions().setExecutable(document.getElementById('gx').checked);
	calc.getMode().getUsersPermissions().setReadable(document.getElementById('ur').checked);
	calc.getMode().getUsersPermissions().setWriteable(document.getElementById('uw').checked);
	calc.getMode().getUsersPermissions().setExecutable(document.getElementById('ux').checked);
	document.getElementById('num').innerHTML = calc.toNumber();
	document.getElementById('str').innerHTML = calc.toString();
	document.getElementById('cmd').innerHTML = calc.toCommand();
}